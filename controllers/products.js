const Product = require('../models/product.js')

const getAllProductsStatic = async (req,res) => {
    const products = await Product.find({}).sort('name')
    res.status(200).json({nbHits:products.length , products})
}

const getAllProducts = async (req,res) => {
    const {featured , company , name , sort , fields , numericFilters } = req.query      //extraction of queries from req.query
    const queryObject = {}
    //checking of individual product properties
    if(featured)
        queryObject.featured = featured
    if(company)
        queryObject.company = company
    if(name)
        queryObject.name = {$regex:name , $options:'i'}     //we arre seting here regex which means that combination bof letters occur then it will b displayed . options is to make it case insensetive
           

    //numeric filters
    if(numericFilters){
        //converting > to $gt becasue moongoose understood this language
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
         }
         const regex = /\b(<|>|>=|=|<|<=)\b/g
         let filters = numericFilters.replace(regex , (match => `-${operatorMap[match]}-`))

         const options = ['price' , 'rating' ]
         filters = filters.split(',').forEach(item => {
            const [field , operator , value] = item.split('-')
            if(options.includes(field)){
               queryObject[field] = { [operator]:Number(value) }
            }
        });
    }

    let result = Product.find(queryObject)
    //sorting functionality
    if(sort){
        const sortedList = sort.split(',').join(' ')            //user will pass the sort separated by , commas so we split it by comma and join it by space
        result = result.sort(sortedList)
    }
    else{
        result = result.sort('createdAt')
    }

    //select certain fields
    if(fields){
        const fieldsList = fields.split(',').join(' ')            //user will pass the sort separated by , commas so we split it by comma and join it by space
        result = result.select(fieldsList)
    }

    //pagenation
    const page = Number(req.query.page) || 1        //default page number is 1  
    const limit = Number(req.query.limit) || 10     //default limitis 10
    const skip = (page-1) * limit                   //skip the first how many products.so that when we are page 2 skip (2-1)*limit products
    result = result.skip(skip).limit(limit)         //integrating skip and limit


    
    
    
    
    
    
    // console.log(queryObject)
    const products = await result
    res.status(200).json({ nbHits:products.length , products })
}

module.exports = { getAllProducts, getAllProductsStatic}


//{{URL}}/products?sort='name    will gie the sorted products according to alphabetical orders of their names
//sorting -- sort
//selecting  -- fields
//limiting the number of products to return     ---   limit 