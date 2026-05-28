import express from "express"
import dbconnected from "./src/config/dbconnected.js"
import 'dotenv/config' 
import userRoute from "./src/routes/userRoute.js"
import todoRoute from "./src/routes/todoRoute.js";




const app = express();
const port = process.env.PORT

dbconnected()
app.use(express.json())
app.use('/user', userRoute)
app.use('/todo', todoRoute)




app.listen(port,()=>{
    console.log(`Server Started on Port: ${port}`)
})