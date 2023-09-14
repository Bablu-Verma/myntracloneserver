import express from 'express'
import { UserList, UserDetails, EditUserDetail, ChangeUserPassword, DeleteAccountRequest, DeleteAccountVerifyOTP, EditUserProfile, searchUser } from '../controllers/user_controller.js'
import { checkLoginMiddleware } from '../middleware/checkUser.js'
import { uploadUserImage } from '../config/uploadUserImage.js'
import { checkAdminMiddleware } from '../middleware/CheckAdmin.js'


// rout object 
const user_route = express.Router()


user_route.get('/user-details', checkLoginMiddleware, UserDetails)
user_route.post('/edit-user-detail', checkLoginMiddleware, uploadUserImage.single("profile"), EditUserDetail)
user_route.post('/edit-user-profile', checkLoginMiddleware, uploadUserImage.single("profile"), EditUserProfile)
user_route.post('/change-user-password', checkLoginMiddleware, ChangeUserPassword)
user_route.post('/delete-account-request', checkLoginMiddleware, DeleteAccountRequest)
user_route.post('/delete-account-otp-verify', checkLoginMiddleware, DeleteAccountVerifyOTP)

user_route.get('/user-list', checkLoginMiddleware,checkAdminMiddleware, UserList)
user_route.post('/search-user', checkLoginMiddleware,checkAdminMiddleware, searchUser)

export default user_route