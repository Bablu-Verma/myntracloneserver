import express from 'express'

import { checkLoginMiddleware } from '../middleware/checkUser.js'
import { GetUserOrder, PlaceOrder } from '../controllers/order_controller.js'



// rout object 
const order_route = express.Router()

order_route.post('/place-order',checkLoginMiddleware, PlaceOrder)
order_route.post('/get-order',checkLoginMiddleware, GetUserOrder )


export default order_route