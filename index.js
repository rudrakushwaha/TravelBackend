import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import connectDB from './db.js';
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import reviewRoutes from './routes/reviews.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);   //signup
app.use("/api/auth", authRoutes);   //login  
app.use('/api/reviews', reviewRoutes); // Reviews


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
