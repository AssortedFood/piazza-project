import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());


import authRoute from './routes/auth.js';
import postsRoute from './routes/posts.js';

app.use('/api/user',authRoute)
app.use('/api/posts',postsRoute)

mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
    console.log('Your mongoDB connector is on...')
})

app.listen(3000, ()=>{
    console.log('Server is running')
})