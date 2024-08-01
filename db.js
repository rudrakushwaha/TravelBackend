import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,  
            useUnifiedTopology: true, 
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to database:", error.message);
        process.exit(1);
    }
};

export default connectDB;
