import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        enum: ["Electronics", "Clothing", "Books", "Beauty", "Others"],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
