import dotenv from 'dotenv'
import express from 'express'
import  color  from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from "./config/connectDB.js"
import auth_route from "./routes/auth_route.js"
import user_route from './routes/user_route.js'
import user_address_route from './routes/user_address_route.js'
import product_route from './routes/product_route.js'
import category_route from './routes/category_route.js'
import sub_category_route from './routes/sub_category_route.js'
import product_comment_route from './routes/product_comment_route.js'
import cart_route from './routes/cart_route.js'
import order_route from './routes/order_route.js'


// create object 
const app = express()

// env config 
dotenv.config()

// variables 
const PORT = process.env.PORT || 8000
const HOST = process.env.HOST_URL

// static files
app.use(express.static('public'));

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(cors())


// call db 
connectDB(HOST)


// define routes 
app.get('/',(req, resp)=>{
    resp.send('App Is Working')
})

app.use("/api/v1/auth",auth_route)
app.use("/api/v1/user",user_route)
app.use("/api/v1/user/address",user_address_route)
app.use("/api/v1/category",category_route)
app.use("/api/v1/sub-category",sub_category_route)
app.use("/api/v1/product",product_route)
app.use("/api/v1/product-comment",product_comment_route)
app.use("/api/v1/cart",cart_route)
app.use("/api/v1/order",order_route)






// app listen 
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`.bgCyan)
})