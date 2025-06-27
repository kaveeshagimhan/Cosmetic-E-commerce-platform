import Order from "../Models/order.js";


export async function createOrder(req, res) {
    if (req.user == null) {
        res.json({
            message: "please login and try again"
        })
        return;
    }

    const orderInfo = req.body;

    if (orderInfo.name == null) {
        orderInfo.name = req.user.firstName + " " + req.user.lastName;
    }

    let orderId = "CBC00001";

    try {
        const lastOrder = await Order.find().sort({ date: -1 }).limit(1);

        if (lastOrder.length > 0) {
            const lastOrderId = lastOrder[0].orderId;

            const lastOderNumberString = lastOrderId.replace("CBC", "");
            const lastOrderNumber = parseInt(lastOderNumberString);
            const newOrderNumber = lastOrderNumber + 1;
            const newOrderNumberString = String(newOrderNumber).padStart(5, "0");
            orderId = "CBC" + newOrderNumberString;
        }

        const newOrder = new Order({
            orderId: orderId,
            email: req.user.email,
            name: orderInfo.name,
            address: orderInfo.address,
            total: 0,
            phone: orderInfo.phone,
            products: []
        })

        try {
            const createdOrder = await newOrder.save();
            res.json({
                message: "Order created successfully",
                order: createdOrder
            });

        } catch (err) {
            res.json({
                message: "Failed to create order",
                error: err
            });
            return;
        }
    } catch (err) {
        res.json({
            message: "Failed to create orderx",
            error: err
        });
        return;
    }


}