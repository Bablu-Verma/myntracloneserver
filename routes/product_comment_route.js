import express from 'express'

import { checkLoginMiddleware } from '../middleware/checkUser.js'
import { AddProductComment, DeleteProductComment, EditProductComment, ListProductComment } from '../controllers/product_comment_controller.js'


// rout object 
const product_comment_route = express.Router()

product_comment_route.post('/add', checkLoginMiddleware, AddProductComment )
product_comment_route.post('/list',ListProductComment)
product_comment_route.post('/edit', checkLoginMiddleware, EditProductComment,)
product_comment_route.post('/delete', checkLoginMiddleware, DeleteProductComment,)



export default product_comment_route