import mongoose, { mongo } from 'mongoose';
let isConnected = false;
export const connecttoDb = async ()=>{
    mongoose.set('strictQuery',true);
    if(!process.env.MONGODB_URI) return console.log('MONGODB NOT CONNECTED');
    if(isConnected) return console.log("using existing connection");

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("database connected");
    } catch (error) {
        console.log(error)
        
    }
}