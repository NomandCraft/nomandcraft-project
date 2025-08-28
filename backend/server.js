// server.js
import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';
import clearPort from './utils/clearPort.js';
import setupShutdownHandler from './utils/shutdownHandler.js';

const PORT =
  process.env.PORT || (process.env.NODE_ENV === 'test' ? 5001 : 5000);

let server;
try {
  await connectDB(process.env.MONGODB_URI); // дождались БД
  await clearPort(PORT);

  server = app.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
  });

  setupShutdownHandler(server);
} catch (err) {
  console.error('💥 Startup failed:', err.message);
  process.exit(1);
}

export default server;
