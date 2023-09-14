import UserModel from "../models/user_model.js";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import CartModel from '../models/cart_model.js'
import ProductModel from "../models/product_model.js";
import AddressModel from "../models/user_address_model.js";


dotenv.config()
const secretKey = process.env.secretKey

export const PlaceOrder =  async(req, resp)=>{
    const {cartId}= req.body
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);

     
    if(!cartId){
     return resp.status(422).send({
        status: 0,
        developer_message: 'Enter Cart Id In Array',
      })
    }
    // console.log(cartId)
  try {
   
    const cartDataPromises = cartId.map(id => CartModel.findById(id));

    const cartData = await Promise.all(cartDataPromises);
    // console.log(cartData)
    let totalAmount = 0;

    for (const cartItem of cartData) {
      totalAmount += cartItem.cartAmount;
    }

    const promises = cartData.map(async (item) => {
      const product = await ProductModel.findById(item.productId);
      return {
          ...item.toObject(), 
          product:{
              name:product.name,
              price:product.price,
          }
      };
  });

  const orderDetails = await Promise.all(promises);
  const find_Address = await AddressModel.find({userId:decodedToken.id})
  const gst_amount =  totalAmount*9/100

  const find_user = await UserModel.findById(decodedToken.id)

    resp.status(201).send({
        status: 1,
        message: 'Order Add Sucessfully',
        amount_detail:{
         amount: totalAmount,
         gst_amount: gst_amount,
         total_amount : totalAmount + gst_amount
        },
        address_message:"Chose Your Shipping Address ",
        user_address:find_Address,
        orderDetail:orderDetails,
        user_detail:{
          name:find_user.name,
          email:find_user.email,
          id:find_user._id,
        },
      })

  } catch (error) {
    resp.status(500).send({
        status: 0,
        message: 'Server Error',
        error
      })
  }
}


export const GetUserOrder =  async(req, resp)=>{
    try {
    
    } catch (error) {
      resp.status(500).send({
          status: 0,
          message: 'Server Error',
          error
        })
    }
}