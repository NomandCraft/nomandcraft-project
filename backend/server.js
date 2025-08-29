// server.js
import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';
import clearPort from './utils/clearPort.js';
import setupShutdownHandler from './utils/shutdownHandler.js';

const PORT = process.env.PORT || 5000;

let server = null;

export async function start() {
  try {
    await connectDB(); // URI берём внутри connectDB
    if (process.env.NODE_ENV !== 'test') {
      await clearPort(PORT);
      server = app.listen(PORT, () => {
        console.log(`🚀 Server running at: http://localhost:${PORT}`);
      });
      setupShutdownHandler(server);
    }
    return server;
  } catch (err) {
    console.error('💥 Startup failed:', err.message);
    if (process.env.NODE_ENV !== 'test') process.exit(1); // НЕ падаем в тестах
    throw err;
  }
}

// Автозапуск только вне тестов
if (process.env.NODE_ENV !== 'test') {
  start();
}

export default server;
