import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import jwt from 'jsonwebtoken';
import productRouter from './routes/productRoute.js';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    const tokenString = req.headers["authorization"];
    if (tokenString != null) {
        const token = tokenString.replace("Bearer ", "")
            //console.log(token);

        jwt.verify(token, "gg-got-gg",
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


mongoose.connect('mongodb+srv://admin:123@cluster0.b6lm42t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.error("Database connection failed:", err);
});

app.use('/api/users', userRouter);
app.use('/api/product', productRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});