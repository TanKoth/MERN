// const fs = require('fs')

// const content = "this is my first file in Node.js"


// Create file
// fs.writeFile('fistFile.txt',content,"utf-8",(err) =>{
//   if(err){
//     console.log("Something went wrong", err)
//     return;
//   }else{
//     console.log("File Created Successfully")
//   }
// })


// Read File

// fs.readFile("fistFile.txt","utf-8",(err,data) =>{
//   if(err){
//     console.log("Something went wrong", err)
//     return;
//   }else{
//     console.log("Data of the file : ",data)
//     //console.log("File Read Successfully")
//   }
// })

// creating hhtp server

const http = require("http")

const server = http.createServer((req,res) =>{
  res.setHeader("Content-Type" ,"text/plain")
  res.write("Hello Node.js server is running on port 3000")
  res.end()
})

const port = 3000
const host = "localhost"

server.listen(port,host,() =>{
  console.log(`Server is running on http://${host}:${port}`);
})