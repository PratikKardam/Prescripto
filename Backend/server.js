import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// app config

const app = express()
const port = process.env.PORT || 4001
const allowedOrigins = [
  'https://prescripto-admin-mdhi.onrender.com',
  'https://prescripto-frontend-66k2.onrender.com'
];
connectDB()
connectCloudinary()

// middlewares

app.use(express.json())


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // if needed for cookies or auth headers
}));


// api end point
app.use('/api/doctor',doctorRouter)
app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send('API working fine dsaASDSAD')
})

app.listen(port, ()=>{
    console.log('Server started',port)
})
