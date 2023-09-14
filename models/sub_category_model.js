import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    subCategory: {
        type: String,
        unique: true,
        required: true,
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
},{ timestamps: true });

const SubCategoryModel = mongoose.model('SubCategory', subCategorySchema);

export default SubCategoryModel;