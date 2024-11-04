//UMTREXKgPy36Eb3c
// mongodb://tanmaykothale8:UMTREXKgPy36Eb3c@cluster0-shard-00-01.b9w7q.mongodb.net:27017/?ssl=true&replicaSet=atlas-7ax3mh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
//git remote add origin https://github.com/TanKoth/MERN.git  
// >> git branch -M main
// >> git push -u origin main 

const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());

const dbUrl = `mongodb://tanmaykothale8:UMTREXKgPy36Eb3c@cluster0-shard-00-01.b9w7q.mongodb.net:27017/?ssl=true&replicaSet=atlas-7ax3mh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(dbUrl)
.then((connection) => {
  console.log('Connected to MongoDB');
}).catch((error)=>{
  console.log('Error connecting to MongoDB',error);
})

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true,
  },
  price:{
    type:Number,
    required:true
  },
  isInStock:{
    type:Boolean,
    default:true,
  },
  category:{
    type:String,
    required:true,
    unique:true,
  }
})

const productModel = mongoose.model("products",productSchema);

app.post("/api/products",async (req,res) =>{
  try{
    const product = new productModel(req.body);
    await product.save();
    res.status(200).json({message:"Product added successfully",product})
  }catch(error){
    res.status(400).json({message:"Error adding product",error})
  }
})

app.get("/api/products",async (req,res) =>{
  try{
    const products = await productModel.find();
    if(products.length === 0){
      res.status(200).json({message:"No products found"})
    }else{
      res.status(200).json({messge:"Here is the product list",products})
    }
  }catch(error){
    res.status(400).json({message:"Error fetching products",error})
  }
})

const port = 3000;
const host = "localhost";

app.listen(port,host,()=>{
  console.log(`Server is running on http://${host}:${port}`);
})