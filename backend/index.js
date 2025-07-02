import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import jwt from 'jsonwebtoken';
import productRouter from './routes/productRoute.js';
import orderRouter from './routes/orderRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use((req, res, next) => {
    const tokenString = req.headers["authorization"];
    if (tokenString != null) {
        const token = tokenString.replace("Bearer ", "")
            //console.log(token);

        jwt.verify(token, process.env.JWT_KEY,
            (err, decoded) => {
                if (decoded != null) {
                    req.user = decoded;
                    next()

                } else {
                    console.log("invalid token")
                    res.status(403).json({
                        message: "Invalid token"
                    })
                }

            }
        )
    } else {
        next();
    }

});


mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.error("Database connection failed:", err);
});

app.use('/api/users', userRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});