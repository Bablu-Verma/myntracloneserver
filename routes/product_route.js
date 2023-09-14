import express from 'express'

import { checkLoginMiddleware } from '../middleware/checkUser.js'
import { AddProduct, EditProduct, ProductDelete, ProductList, searchProduct } from '../controllers/product_controller.js'
import { checkAdminMiddleware } from '../middleware/CheckAdmin.js'
import { uploadUserImage } from '../config/uploadUserImage.js'

// rout object 
const product_route = express.Router()

product_route.post('/add-product', checkLoginMiddleware, checkAdminMiddleware,uploadUserImage.single("image"), AddProduct)
product_route.get('/product-list', ProductList)
product_route.post('/edit-product', checkLoginMiddleware, checkAdminMiddleware,uploadUserImage.single("image"),EditProduct)
product_route.post('/delete-product', checkLoginMiddleware, checkAdminMiddleware,ProductDelete)
product_route.post('/product-search',searchProduct )


export default product_route