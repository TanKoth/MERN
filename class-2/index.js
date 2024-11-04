const express = require("express");

const app = express();
app.use(express.json());


//for static files
// app.use(express.static("public"))


// custom middleware
// const loggerMiddleware =(re,res,next) =>{
//   console.log(`Logged ${req.url} ${req.method} ${new Date().toISOString()}`)
// }

const users = [
  {
    "id": 1,
    "name": "Tanmay"
  },
  {
    "id": 2,
    "name": "Saniya"
  }
];

//Get request to get all users
app.get("/users",(req,res) =>{
  if(users.length === 0){
    res.status(404).json({message:"No users found, list is empty"})
  }
  res.status(200).json({message:"All Users", Users:users})
})

//Get request to get a specific user
app.get("users/:id",(req,res) =>{
  const userId = req.params.id;
  const user = users.findIndex(user => user.id == userId)
  if(!user){
    res.status(404).json({message:"User not found"})
  }
  res.status(200).json({message:"User Found",User:user})
})

//Post request to add a new user
app.post("/users", (req, res) => {
  const newUser = req.body;
  const userId = users.length + 1;
  newUser.id = userId;
  users.push(newUser);
  console.log(users);

  res.status(201).json({ "message": "User Created Successfully", "Users": users });
});


//Delete request to delete a user
app.delete("/users/:id",(req,res) => {
  const deleteId = req.params.id;
  const userIndex = users.findIndex(user => user.id == deleteId);
  users.slice(userIndex,1);
  res.status(200).json({message:"User Deleted Successfully", Users:users})
})

// If no method found for the request then this will be called
app.use((req, res) => {
  res.status(404).json({message:"Page Not Found"})
});

//Setting up the port and host
const port = 3000;
const host = "localhost";

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}/users`); // Corrected 'htpp' to 'http'
});