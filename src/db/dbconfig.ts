import { error } from "console";
import mongoose from "mongoose";

export  async function connect() {
    try {
        // ! exclamatory signs define 100% the data is coming in string data type
        await mongoose.connect(process.env.MONGO_URI!)
        const connection=mongoose.connection
        connection.on('connected',()=>{
            console.log("MongoDB Connected");
            
        })

        connection.on('error',()=>{
            console.log("MongoDB Connection error please make sure db is up and running"+error);
            process.exit()
            
        })



    } catch (error) {
        console.log("something went wrong in connecting to db :",error);
        
    }
}