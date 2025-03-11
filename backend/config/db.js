import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('✅ Уже подключено к MongoDB');
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('❌ MONGODB_URI не задан!');
    }

    console.log('🔍 Подключение к MongoDB:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB успешно подключен');
  } catch (error) {
    console.error('❌ Ошибка подключения к MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
