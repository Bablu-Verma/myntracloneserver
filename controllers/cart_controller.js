
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import CartModel from '../models/cart_model.js'
import ProductModel from '../models/product_model.js'

dotenv.config()
const secretKey = process.env.secretKey

export const AddCart = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);

    const { productId, quantity } = req.body

    if (!productId) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            developer_message: 'Add Product Id',
        })
    }
    if (!quantity) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            developer_message: 'Product quantity Min 1',
        })
    }
    try {

        const find_user_cart_product = await CartModel.findOne({ userId: decodedToken.id, productId: productId })

        if (find_user_cart_product == null) {
            const find_product = await ProductModel.findOne({ _id: productId })
            const total_amount = find_product.offerPrice * quantity

            const create_cart = CartModel({ productId, userId: decodedToken.id, quantity, cartAmount: total_amount });
            const save_create_cart = await create_cart.save()

            resp.status(201).send({
                status: 1,
                message: 'Add Product In Cart Successfully',
                create_category: save_create_cart
            })

        } else {
            const find_product = await ProductModel.findOne({ _id: productId })
            let cart_quantity = find_user_cart_product.quantity + quantity
            let cart_amount = find_product.offerPrice * cart_quantity
            console.log(cart_amount, cart_quantity)

            console.log(find_user_cart_product)
            const updateCart = await CartModel.findByIdAndUpdate({ _id: find_user_cart_product._id },
                { cartAmount: cart_amount, quantity: cart_quantity },
                { new: true })

            // console.log(cart_quantity, product_amount)
            resp.status(200).send({
                status: 1,
                message: 'Add More quantity in this Product In Cart Successfully',
                create_category: updateCart
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

export const ListAddCart = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);

    try {
        const find_user_cart_product = await CartModel.find({ userId: decodedToken.id })

        console.log(find_user_cart_product) 

        let totalAmount = 0;

        for (const cartItem of find_user_cart_product) {
          totalAmount += cartItem.cartAmount;
        }

        const promises = find_user_cart_product.map(async (item) => {
          const product = await ProductModel.findById(item.productId);
          return {
              ...item.toObject(), 
              product:{
                  name:product.name,
                  image:product.image,
                  price:product.price,
              }
             
          };
      });

      const productCartWithDetails = await Promise.all(promises);

        resp.status(200).send({
            status: 1,
            message: 'All Product in User Cart',
            totalAmount:totalAmount,
            cart: productCartWithDetails
        })

    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }
}

export const editAddCartProduct = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);
    const { cartId, quantity } = req.body

    if (!cartId) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            developer_message: 'Add Cart Id',
        })
    }
    if (!quantity) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            message: 'Add Product quantity Min 1 Required',
        })
    }
    try {
        const findCart = await CartModel.findById(cartId)

        if (findCart.userId != decodedToken.id) {
            return resp.status(422).send({
                code: 0,
                status: 0,
                message: "You Can't Update This Product",
            })
        }

        const find_product = await ProductModel.findOne({ _id: findCart.productId })

        let cart_amount = find_product.offerPrice * quantity


        const updateCart = await CartModel.findByIdAndUpdate({ _id: cartId },
            { cartAmount: cart_amount, quantity },
            { new: true })

        // console.log(cart_quantity, product_amount)
        resp.status(200).send({
            status: 1,
            message: 'Add More quantity in this Product Successfully',
            update_cart: updateCart
        })

    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }
}

export const DeleteAddCartProduct = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);
    const { cartId } = req.body

    if (!cartId) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            developer_message: 'Add Cart Id',
        })
    }

    try {

        const findCart = await CartModel.findById(cartId)

        if (findCart.userId != decodedToken.id) {
            return resp.status(422).send({
                code: 0,
                status: 0,
                developer_message: "You Can't Delete This Product Cart",
            })
        }
        const delete_user_cart_product = await CartModel.findByIdAndRemove(cartId)
        console.log(delete_user_cart_product)

        resp.status(200).send({
            status: 1,
            message: 'Successfully Remove Product',
            remove: delete_user_cart_product
        })

    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }
}

export const DeleteManyCartProduct = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);
    try {
        const delete_many_cart_product = await CartModel.deleteMany({ userId: decodedToken.id })
        resp.status(200).send({
            status: 1,
            message: 'Delete All Product In your Cart',
            removeAll: delete_many_cart_product
        })
    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }
}