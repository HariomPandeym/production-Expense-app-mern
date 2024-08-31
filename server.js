const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const colors=require('colors')
const path=require('path')
const connectDb = require('./config/connectDb')

//CONFIG DOT ENV FILE
dotenv.config();
connectDb();

//REST OBJECT
const app=express()

//MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())


app.use('/api/v1/users',require('./routes/userRoute'))
app.use('/api/v1/transections',require('./routes/transectionRoutes'))


// static files
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
})

const PORT=8080 || process.env.PORT
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})