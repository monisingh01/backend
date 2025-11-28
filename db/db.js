import mongoose from "mongoose";


const connectDB = async () =>{
    try{
    const server = await mongoose.connect(process.env.DB_URL);
    console.log(`Mongo DB Connected Successfully : ${server.connection.host}`)
    }
    catch(error){
        console.log("Database connection error",error)
    }
}

export default connectDB