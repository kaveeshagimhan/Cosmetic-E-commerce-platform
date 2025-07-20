import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    productId: {
        type: String,
        required: true,
        index: true,
    },
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;