import mongoose from "mongoose";
import moment from "moment/moment.js";


const CartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    quantity:{
        type:Number,
        required: true,
        default:1
    },
    cartAmount:{
        type:Number,
        required: true,
    },
   
    addCart: {
        type: String,
        default: moment().format('MMMM Do YYYY, h:mm:ss a'),
    },
   
},{ timestamps: true });

const CartModel = mongoose.model('Cart', CartSchema);

export default CartModel;