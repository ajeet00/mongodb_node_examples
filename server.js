const express = require('express');
require('dotenv').config();

const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("Connected to Database"));

app.use(express.json());


const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);


const userRouter = require('./routes/users');
app.use('/user', userRouter);


const categoryRouter = require('./routes/category');
app.use('/category', categoryRouter);


app.listen(4001, () => {
    console.log("Server Started " + 4001);
});