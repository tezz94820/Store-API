//here we are just passing all the initial products in the  database

require('dotenv').config()

const mongoose = require('mongoose') 
const Product = require('./models/product.js')
const connectDB = require('./db/connect.js')
const jsonProducts = require('./products.json')

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)  // create//in order to pass more than one objects pass the array of objects which is now stotred in json Products
        console.log('connection established')
        process.exit(0)    // exit the process if the connection is successfull . 0 signifies that we were successfull and we want to terminatre as our work is done
    } catch (error) {
        console.log(error)
        process.exit(1)     //here 1 means terminating connection with error code 1 
    }
}
start()