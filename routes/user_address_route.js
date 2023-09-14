import express from 'express'

import { checkLoginMiddleware } from '../middleware/checkUser.js'
import { DeleteUserAddress, UserAddressList, addUserAddress } from '../controllers/user_address_controller.js'



// rout object 
const user_address_route = express.Router()


user_address_route.post('/add-user-address', checkLoginMiddleware, addUserAddress)
user_address_route.get('/user-address-list', checkLoginMiddleware, UserAddressList)
user_address_route.post('/delete-user-address', checkLoginMiddleware, DeleteUserAddress)


export default user_address_route