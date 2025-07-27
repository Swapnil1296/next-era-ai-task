import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupSwagger } from '../swagger';
import { corsOptions } from './config';
import authRoutes from './routes/auth';

dotenv.config();
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
setupSwagger(app);

//routes 
app.use('/api/auth', authRoutes);



mongoose.connect(process.env.MONGO_URI || '').then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log(error);
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});