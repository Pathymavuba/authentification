const express = require('express');
const mongoose = require('./config/database')
const userRouter = require('./routers/userRouter')
const auth = require('./middleware/auth')

const app = express();

require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended:true}))

app.get('/api',auth,(req,res)=>res.status(200).send('Hello Pathy Dev'))

app.use('/api',userRouter)



app.listen(process.env.PORT,()=>{
    console.log(`server listening on ${process.env.PORT}`);
})