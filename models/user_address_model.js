import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    postalCode: {
        type: String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    addressType:{
      type:String,
      default:'home'
    }
    
},{ timestamps: true });

const AddressModel = mongoose.model('Address', addressSchema);

export default AddressModel;