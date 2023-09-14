import mongoose from "mongoose";

const ProductCommentSchema = new mongoose.Schema({
   productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
   },
   userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
   },
   message:{
     type:String
   }
},{ timestamps: true });

const ProductCommentModel = mongoose.model('ProductComment', ProductCommentSchema);

export default ProductCommentModel;