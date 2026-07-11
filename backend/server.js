import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import { initializeAdmin } from './models/adminModel.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import adminRouter from './routes/adminRoute.js' // Added Admin Router
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import clearRouter from './routes/clearRoute.js'
import enquiryRouter from './routes/enquiryRoute.js'
import blogRouter from './routes/blogRoute.js'


// App Config
const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/clear', clearRouter)
app.use('/api/enquiry', enquiryRouter)
app.use('/api/blog', blogRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => console.log('Backend Started on Port : ' + port))