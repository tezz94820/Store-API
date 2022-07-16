require('dotenv').config()
require('express-async-errors')     //this package controlls all the async errors which firstly we were catching by try and catch block 
 
const express = require('express');
const app = express()
const productsRouter = require('./routes/products.js')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler.js')
const connectDB = require('./db/connect.js')

//middlewares
app.use(express.json())

//routes
app.get('/',(req,res) => {
    res.status(200).send('<h1>Store API</h1><a href="/api/v1/products">Products page</a>')
})
app.use('/api/v1/products' , productsRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



const port = process.env.PORT  || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen( port , () => console.log(`Listening on port ${port} ...`) )
    } catch (error) {
        console.log(error)
    }
}
start()