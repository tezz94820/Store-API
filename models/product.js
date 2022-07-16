const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true , 'Product name must be provided']
    },
    price : {
        type: Number,
        required : [ true , 'Product Price must be provided']
    } ,
    featured : {
        type: Boolean,
        default : false 
    } ,
    rating : {
        type: Number,
        default : 4.5
    } ,
    createdAt : {
        type:Date , 
        default : Date.now()
    },
    company : {
        type:String,
        enum :{
                values : ['ikea' , 'liddy' , 'caressa' , 'marcos'],     //we assumed here that company can be only specified one.so we pass the companies under enum values which means only that is acceptable
                message : '{VALUE} is not supported'        //error message if any other vaslue is used
        }   
    }
    
    
})

module.exports = mongoose.model('Product' , productSchema)