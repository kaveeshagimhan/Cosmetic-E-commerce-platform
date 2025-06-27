import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        reqired: true
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    },
    total: {
        type: Number,
        required: true
    },
    products: [{
        productinfo: {
            productId: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            altNames: [
                { type: String }
            ],
            description: {
                type: String,
                required: true
            },
            images: [{
                type: String
            }],
            labelledPrice: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }

})

const order = mongoose.model("Order", orderSchema);
export default order;