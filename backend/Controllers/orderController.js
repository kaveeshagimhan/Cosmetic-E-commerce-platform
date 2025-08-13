import Order from "../Models/order.js";
import Product from "../Models/product.js";


export async function createOrder(req, res) {
    if (req.user == null) {
        res.status(403).json({
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



        try {
            let total = 0;
            let labelledTotal = 0;
            const products = [];

            for (let i = 0; i < orderInfo.products.length; i++) {

                const item = await Product.findOne({ productId: orderInfo.products[i].productId });
                if (item == null) {
                    res.status(404).json({
                        message: "Product with productId " + orderInfo.products[i].productId + " not found"
                    })
                    return;
                }
                if (item.isAvailable == false) {
                    res.status(404).json({
                        message: "Product with productId " + orderInfo.products[i].productId + " not available right now"
                    })
                    return;
                }

                products.push = {
                    productInfo: {
                        productId: item.productId,
                        name: item.productName,
                        altNames: item.altNames,
                        description: item.description,
                        images: item.images,
                        labelledPrice: item.labelledPrice,
                        price: item.price
                    },
                    quantity: orderInfo.products[i].qty
                }
                total += item.price * orderInfo.products[i].qty;
                labelledTotal += item.labelledPrice * orderInfo.products[i].qty;


            }

            const newOrder = new Order({
                orderId: orderId,
                email: req.user.email,
                name: orderInfo.name,
                address: orderInfo.address,
                total: 0,
                phone: orderInfo.phone,
                products: products,
                labelledTotal: labelledTotal,
                total: total
            })

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
            message: "Failed to create order",
            error: err
        });
        return;
    }


}

export async function getOrders(req, res) {
    if (req.user == null) {
        res.status(403).json({
            message: "please login and try again"
        })
        return;
    }

    try {
        if (req.user.role == "admin") {
            const orders = await Order.find()
            res.json(orders);
        } else {
            const orders = await Order.find({ email: req.user.email });
            res.json(orders);
        }
    } catch (err) {
        res.status(500).json({
            massage: "Failed to fetch orders",
            error: err,
        });
    }

}