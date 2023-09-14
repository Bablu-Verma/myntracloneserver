import mongoose from "mongoose";
import moment from "moment/moment.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gander:{
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    profile: {
        type: String,
    },
    age: {
        type: Number,
    },
    password:{
        type: String,
        required: true,
    },
    otp:{
        type: String,
        default:null
    },
    userType:{
        type :Number,
        default:0,
        required: true,
    },
    createUser: {
        type: String,
        default: moment().format('MMMM Do YYYY, h:mm:ss a'),
    },
   
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

export default UserModel