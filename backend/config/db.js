// config/db.js
import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

let isConnected = false;

const connectDB = async (uri = process.env.MONGODB_URI) => {
  if (mongoose.connection.readyState === 1 || isConnected) {
    // уже подключены
    return;
  }

  if (!uri) {
    throw new Error('❌ MONGODB_URI is not set!');
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      family: 4, // IPv4 helps on some Windows/VPN setups
    });
    isConnected = true;
    console.log('✅ MongoDB successfully connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    if (process.env.NODE_ENV === 'production') process.exit(1);
    else throw error; // в dev/test выбрасываем ошибку
  }
};

export default connectDB;
