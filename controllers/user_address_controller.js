import UserModel from "../models/user_model.js";
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"
import AddressModel from "../models/user_address_model.js";

dotenv.config()
const secretKey = process.env.secretKey


export const addUserAddress = async (req, resp) =>{
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);

    const {street, city, state, postalCode, addressType}  = req.body

    if (!street) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            message: 'Enter Your Street',
        })
    }
    if (!city) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            message: 'Enter Your City',
        })
    }
    if (!state) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            message: 'Enter Your State',
        })
    }
    if (!postalCode) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            message: 'Enter Your Postal Code',
        })
    }
   
 try {

    const user_details = await UserModel.findOne({email:decodedToken.email})

    const addAddress = AddressModel({
        street, city,state,postalCode,addressType,userId:user_details._id
    })
   const save_add_address = await addAddress.save()

    resp.status(200).send({
        status: 1,
        message: 'Add Address Successfull',
        user_details:save_add_address
    })
    
 } catch (error) {
    resp.status(500).send({
        status: 0,
        message: 'Server Error',
        error
    })
 }
}

export const UserAddressList = async (req, resp) =>{
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);

 try {
    console.log(decodedToken)
    const user_address = await AddressModel.find({userId:decodedToken.id})

    resp.status(200).send({
        status: 1,
        message: 'You All Address',
        user_address:user_address
    })
    
 } catch (error) {
    resp.status(500).send({
        status: 0,
        message: 'Server Error',
        error
    })
 }
}

export const DeleteUserAddress = async (req, resp) =>{
   
const {address_id} = req.body

console.log(address_id)

if(!address_id){
   return resp.status(422).send({
        status: 0,
        message: 'Try again',
        developer_message:"add address Id"
    })
}
 try {

   const removedItem =  await AddressModel.findByIdAndRemove(address_id);

   if(removedItem == null){
    return resp.status(200).send({
        status: 0,
        message: 'You Address Already Deleted',
        remove_address: removedItem
    })
   }

    return resp.status(200).send({
        status: 1,
        message: 'You Address Deleted',
        remove_address: removedItem
    })

 } catch (error) {
    resp.status(500).send({
        status: 0,
        message: 'Server Error',
        error
    })
 }
}