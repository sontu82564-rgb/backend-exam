
import 'dotenv/config'
import mongoose from "mongoose";


const url = process.env.DB_STRING



export default async function dbconnected() {
    try{
        await mongoose.connect(url)
        console.log(`connected to Mongodb Server`);
    }catch (error) {
        console.log(`failed to connect Mongodb server error:${error}`);
    }
    
}