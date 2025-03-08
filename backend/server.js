import app from './app.js';
import connectDB from './config/db.js';
connectDB();
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

export default server;
