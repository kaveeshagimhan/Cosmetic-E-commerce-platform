import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";

export default function AdminOrdersPage(){

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(isLoading){
            const token = localStorage.getItem("token");
            if(!token){
                alert("please Login first")
                return;
            }
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res)=>{
                setOrders(req.data);
                console.log(res.data)
                setIsLoading(false);
            }).catch((e)=>{
                alert("Error fetching orders: " + e.response?.data?.massage || "Unknown error");
                setIsLoading(false);
            });
        }
    },[isLoading])
    return(
        <div className="w-full h-full max-full overflow-y-scroll">{
            isLoading?<Loading/>:
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, index)=>{
                            return(
                                <tr key= {index}>
                                    <td>{order.orderId}</td>
                                    <td>{order.name}</td>
                                    <td>{order.email}</td>
                                    <td>{order.address}</td>
                                    <td>{order.phone}</td>
                                    <td>{order.total.toFixed(2)}</td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                    <td>{order.status}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        }

        </div>
    )
} 