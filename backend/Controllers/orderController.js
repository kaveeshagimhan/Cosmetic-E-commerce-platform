import order from "../Models/order.js";

export async function createOrder(req, res) {
    if (req.user == null) {
        res.json({
            message: "please login and try again"
        })
        return;
    }

    const orderInfo = req.body;

    if (orderInfo.name == null) {
        orderInfo.name = req.user.firstName + "" + req.user.lastName;
    }

    let orderId = "CBC00001"

    const lastOrder = await order.find().short({ date: -1 }).limit(1);

    if (lastOrder.length > 0) {
        const lastOrderId = lastOrder[0].orderId;

        const lastOderNumberString = lastOrderId.replace("CBC", "");
        const lastOrderNumber = parseInt(lastOderNumberString);
        const newOrderNumber = lastOrderNumber + 1;
        const newOrderNumberString = String(newOrderNumber).padStart(5, "0");
        orderId = "CBC" + newOrderNumberString;
    }


}