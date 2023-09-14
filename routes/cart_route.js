import express from 'express'
import { AddCart, DeleteAddCartProduct, DeleteManyCartProduct, ListAddCart, editAddCartProduct } from '../controllers/cart_controller.js'
import { checkLoginMiddleware } from '../middleware/checkUser.js'



// rout object 
const cart_route =  express.Router()

cart_route.post('/add',checkLoginMiddleware, AddCart)
cart_route.post('/list',checkLoginMiddleware,ListAddCart)
cart_route.post('/delete',checkLoginMiddleware, DeleteAddCartProduct)
cart_route.post('/delete-many',checkLoginMiddleware, DeleteManyCartProduct)
cart_route.post('/edit', checkLoginMiddleware,editAddCartProduct)



export default cart_route