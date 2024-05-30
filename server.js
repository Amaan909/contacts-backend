const express=require("express")
const dotenv=require("dotenv").config()
const errorHandler=require("./middleware/errorHandle")
const connectdb = require("./config/dbconnect")
const app=express()
connectdb()
const port=process.env.PORT||5000
app.use(express.json())//middleware for data parsing from client 
app.use("/api/contacts",require("./routes/contactRoutes"))//adding middleware
app.use("/api/users",require("./routes/userRoutes"))//adding middleware
app.use(errorHandler)//to convert error response to json

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})