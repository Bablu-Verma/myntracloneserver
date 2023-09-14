import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
},{ timestamps: true });

const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel;