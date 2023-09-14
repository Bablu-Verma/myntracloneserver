import mongoose from "mongoose";
import moment from "moment/moment.js";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price:{
        type:Number,
        required: true,
    },
    image:{
        type:String,
    },
    quantity:{
        type:Number,
        required: true,
    },
    category:{
        type : mongoose.Schema.Types.ObjectId , 
        ref:'Category',
        required: true,
    },
    subCategory:{
        type : mongoose.Schema.Types.ObjectId , 
        ref:'SubCategory',
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    offerPrice:{
        type:Number,
    },
    brand:{
         type:String,
    },
    addProduct: {
        type: String,
        default: moment().format('MMMM Do YYYY, h:mm:ss a'),
    }, 
}, { timestamps: true });

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel