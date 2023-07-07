import mongoose from "mongoose";
export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection= mongoose.connection;
        connection.on('connected',()=>{
            console.log('MondoDB connected')
        })
    } catch (error) {
        console.log('Something goes wrong');
        console.log('error');
        process.exit();
    }
}