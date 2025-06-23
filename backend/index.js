import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:123@cluster0.b6lm42t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.error("Database connection failed:", err);
});

app.use('/api/users', userRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});