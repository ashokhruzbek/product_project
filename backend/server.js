const express = require("express");
const app = express();
const cors = require('cors');
const productRouter = require("./routes/productRouter");

//Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/products', productRouter)


const port = 4000;
app.listen(port,()=>{
    console.log(`Serverimiz ${port}-portida ishga tushdi`);
    
})