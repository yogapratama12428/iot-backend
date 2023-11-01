import express from 'express' 
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import DeviceRoute from './routes/DeviceRoute.js'
import UserRoute from './routes/UserRoute.js'
const app = express()

app.use(cors({
    credentials: false,
    origin: ['http://localhost:5173', 'https://smarthome-indonesia.vercel.app', 'https://smarthomeiotqu-1-g8082369.deta.app']
}))
app.use(express.json())
app.use(DeviceRoute)
app.use(UserRoute)

app.get('/', async (req, res) => {
    res.status(200).json({ msg: 'Success Bro!'})
})

app.listen (process.env.PORT || 3000 , ()=>{
    console.log('listening on port '+ process.env.PORT )
})