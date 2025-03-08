import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    console.log('🔍 Проверка MONGODB_URI:', process.env.MONGODB_URI);
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
};

export default connectDB;
