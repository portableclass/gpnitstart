const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()
const mongoURI = process.env.MONGODB_CONNECTION_STRING;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (err: any) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;
