import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load the environment variables from .env inside src/
dotenv.config();

const mongouri = process.env.MONGOURI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
