import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('✅ Already connected to Mongodb');
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('❌ Mongodb_uri is not set!');
    }

    console.log('🔍 Connection to Mongodb:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB  successfully connected');
  } catch (error) {
    console.error('❌ Mongodb connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
