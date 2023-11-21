import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import router from './router/index.js';


config();
const PORT = process.env.PORT || 3005;
const app = express();
// app.use(express.static('../frontend/dist'));
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	}),
);
app.use(cookieParser());
app.use(express.json());
app.use('/', router);


const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		app.listen(PORT, () => {
			console.log(`Сервер запущен:${PORT}`);
		});
	} catch (error) {
		console.log('ERROR:', error);
	}
};

start();
