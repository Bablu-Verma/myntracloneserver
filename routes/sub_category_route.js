import express from 'express'

import { checkLoginMiddleware } from '../middleware/checkUser.js'
import { checkAdminMiddleware } from '../middleware/CheckAdmin.js'
import { AddSubCategory, DeleteSubCategory, ListSubCategory } from '../controllers/sub_category_controller.js'

// rout object 
const sub_category_route = express.Router()

sub_category_route.post('/add', checkLoginMiddleware, checkAdminMiddleware, AddSubCategory )
sub_category_route.post('/list', checkLoginMiddleware, checkAdminMiddleware,ListSubCategory )
sub_category_route.post('/delete', checkLoginMiddleware, checkAdminMiddleware,DeleteSubCategory)


export default sub_category_route