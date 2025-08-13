import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Important for accessibility

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setOrders(res.data);
          setIsLoading(false);
        })
        .catch((e) => {
          alert(
            "Error fetching orders: " +
              (e.response?.data?.message || "Unknown error")
          );
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full max-full overflow-y-scroll">
      {/* Modal for selected order */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            width: "500px",
            margin: "auto",
            borderRadius: "12px",
            padding: "20px",
          },
        }}
      >
        {activeOrder && (
          <div className="space-y-2">
            <h2 className="text-xl font-bold mb-2">Order Details</h2>
            <p>
              <strong>Order ID:</strong> {activeOrder.orderId}
            </p>
            <p>
              <strong>Name:</strong> {activeOrder.name}
            </p>
            <p>
              <strong>Email:</strong> {activeOrder.email}
            </p>
            <p>
              <strong>Address:</strong> {activeOrder.address}
            </p>
            <p>
              <strong>Phone:</strong> {activeOrder.phone}
            </p>
            <p>
              <strong>Total:</strong> ${activeOrder.total.toFixed(2)}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(activeOrder.date).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {activeOrder.status}
              <select 
                onChange={(e)=>{
                    console.log(e)
                }}
              >

                <option selected disabled>Change status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="returned">returned</option>
              </select>
            </p>

            {/* Example: if order has items */}
            {activeOrder.items && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Items:</h3>
                <ul className="list-disc pl-5">
                  {activeOrder.items.map((item, i) => (
                    <li key={i}>
                      {item.productName} - {item.quantity} × $
                      {item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setModalIsOpen(false)}
            >
              Close
            </button>
          </div>
        )}
      </Modal>

      {isLoading ? (
        <Loading />
      ) : (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-3 py-2">Order ID</th>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Address</th>
              <th className="border px-3 py-2">Phone</th>
              <th className="border px-3 py-2">Total</th>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setActiveOrder(order);
                  setModalIsOpen(true);
                }}
              >
                <td className="border px-3 py-2">{order.orderId}</td>
                <td className="border px-3 py-2">{order.name}</td>
                <td className="border px-3 py-2">{order.email}</td>
                <td className="border px-3 py-2">{order.address}</td>
                <td className="border px-3 py-2">{order.phone}</td>
                <td className="border px-3 py-2">
                  ${order.total.toFixed(2)}
                </td>
                <td className="border px-3 py-2">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="border px-3 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
