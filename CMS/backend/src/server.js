import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './connectDB.js';
import router from './routes/blogRoutes.js'; // ✅ FIXED path
import route from './routes/loginRoute.js';

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json()); // to parse JSON body
app.use(express.urlencoded({ extended: true })); // ✅ to parse form-data / x-www-form-urlencoded

// ✅ Connect to DB
connectDB();

// ✅ Routes
app.use('/api/blogs', router);
app.use('/api/logincredential',route);

// ✅ Server Listen
const port = process.env.PORT || 5000;
app.listen(port,'0.0.0.0', () => console.log("✅ Server is running on indicated port"));
