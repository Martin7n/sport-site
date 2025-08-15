import mongoose from "mongoose";
import { seedData } from "./data/dataSeed.js";



export const mongooseConnect = async (dbName) =>
{

    try {
    const dbAdress = `mongodb://127.0.0.1:27017/${dbName}`
    mongoose.connect(dbAdress)
    mongoose.connection.on('connected', () => 
        console.log(`DB Connected Successfuly!\nConnected to: ${dbName}\nat: ${dbAdress}`))

      await seedData();
    
    } catch (err) {
    console.log(`DB Connection error ${err.message}`)
    };

};

