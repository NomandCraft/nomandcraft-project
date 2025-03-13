import app from './app.js';
import connectDB from './config/db.js';
import clearPort from './utils/clearPort.js';
import setupShutdownHandler from './utils/shutdownHandler.js';

connectDB();

const PORT =
  process.env.PORT || (process.env.NODE_ENV === 'test' ? 5001 : 5000);

clearPort(PORT);

let server = null;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    /*   console.log(`🚀 Server started on port ${PORT}`); */
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
  });

  setupShutdownHandler(server);
}

export default server;
