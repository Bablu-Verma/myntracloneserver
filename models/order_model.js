import mongoose from "mongoose";
import moment from "moment/moment.js";


const OrderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    totalAmount:{
        type:Number,
        required: true,
    },
    orderDate: {
        type: String,
        default: moment().format('MMMM Do YYYY, h:mm:ss a'),
    },
    address:{
        type:String,   
    }
   
},{ timestamps: true });

const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel;