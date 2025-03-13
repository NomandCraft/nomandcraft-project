import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import camperRoutes from './routes/campers.js';
import userRoutes from './routes/users.js';
import categoryRoutes from './routes/categories.js';
import errorHandler from './middleware/errorHandler.js';
import helmet from 'helmet';

connectDB();

const app = express();

app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(cors());
app.use(morgan('dev'));

app.use('/api/campers', camperRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

export default app;
