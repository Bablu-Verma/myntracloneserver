import dotenv from "dotenv"
import jwt from 'jsonwebtoken'
import ProductCommentModel from "../models/product_comment_model.js"
import UserModel from "../models/user_model.js"

dotenv.config()
const secretKey = process.env.secretKey


export const AddProductComment = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const { productId, message } = req.body
    const decodedToken = jwt.verify(authorization, secretKey);

    if (!productId) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            developer_message: 'Add Product Id',
        })
    }
    if (!message) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            message: 'Add Message First',
        })
    }

    try {

        const add_comment =  ProductCommentModel({productId,message, userId:decodedToken.id})
        const add_comment_save = await add_comment.save()
        resp.status(201).send({
            status: 1,
            message: 'Add Comment Successfully',
            create_category: add_comment_save
        })

    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }
}

export const ListProductComment = async (req, resp) => {
    const authorization = req.headers?.authorization || null;
     const decodedToken = jwt?.verify(authorization, secretKey) || null

    //  console.log(authorization)

    const { productId } = req.body
    try {
        if(authorization === null){
            const product_comment = await ProductCommentModel.find({productId})
            const promises = product_comment.map(async (comment) => {
              const user = await UserModel.findById(comment.userId);
              return {
                  ...comment.toObject(), 
                  user:{
                      name:user.name,
                      profile:user.profile,
                      email:user.email,
                  }, 
              };
          });
  
          const commentsWithUserData = await Promise.all(promises);
          resp.status(200).send({
              status: 1,
              message: 'Product Comment List',
              productComment: commentsWithUserData
          })
  
        }else{
            const product_comment = await ProductCommentModel.find({productId})
            const promises = product_comment.map(async (comment) => {
              const user = await UserModel.findById(comment.userId);
              return {
                  ...comment.toObject(), 
                  user:{
                      name:user.name,
                      profile:user.profile,
                      email:user.email,
                  },
                  author : comment.userId == decodedToken.id ? 1:0
              };
          });
  
          const commentsWithUserData = await Promise.all(promises);
          resp.status(200).send({
              status: 1,
              message: 'Product Comment List',
              productComment: commentsWithUserData
          })
        }
    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }
}

export const EditProductComment = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const { message, productCommentId } = req.body
    const decodedToken = jwt.verify(authorization, secretKey);

    if (!productCommentId) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            developer_message: 'Add product comment id',
        })
    }
    if (!message) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            message: 'Add Message First',
        })
    }
    try {
        const product_comment = await ProductCommentModel.findOne({_id:productCommentId})
        // console.log(product_comment)
        if(!(product_comment.userId == decodedToken.id)){
            return resp.status(422).send({
                code: 0,
                status: 0,
                message: "You can't edit This Comment",
            })
         }


         const edit_comments = await ProductCommentModel.findByIdAndUpdate(productCommentId,{message},{ new: true})

        resp.status(200).send({
            status: 1,
            message: 'Product Comment Edit Successfull',
            edit_commenets: edit_comments
        })

    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }
}

export const DeleteProductComment = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const {productCommentId } = req.body
    const decodedToken = jwt.verify(authorization, secretKey);

    if (!productCommentId) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            developer_message: 'Add product comment id',
        })
    }
   
    try {
        const product_comment = await ProductCommentModel.findOne({_id:productCommentId})
    
        if(!(product_comment.userId == decodedToken.id)){
            return resp.status(422).send({
                code: 0,
                status: 0,
                message: "You can't Delete This Comment",
            })
         }
         const delete_comments = await ProductCommentModel.findByIdAndRemove(productCommentId)

        resp.status(200).send({
            status: 1,
            message: 'Product Comment Delete Successfull',
            delete_comments: delete_comments
        })

    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }
}