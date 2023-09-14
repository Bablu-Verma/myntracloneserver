import express from 'express'

import { checkLoginMiddleware } from '../middleware/checkUser.js'
import { checkAdminMiddleware } from '../middleware/CheckAdmin.js'
import { AddCategory, DeleteCategory, ListCategory } from '../controllers/category_controller.js'


// rout object 
const category_route = express.Router()

category_route.post('/add-category', checkLoginMiddleware, checkAdminMiddleware, AddCategory)
category_route.get('/category-list', checkLoginMiddleware, checkAdminMiddleware, ListCategory)
category_route.post('/delete-category', checkLoginMiddleware, checkAdminMiddleware,DeleteCategory)


export default category_route