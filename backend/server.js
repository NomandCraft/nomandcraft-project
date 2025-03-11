import app from './app.js';
import connectDB from './config/db.js';

connectDB();

const PORT =
  process.env.PORT || (process.env.NODE_ENV === 'test' ? 5001 : 5000);

let server = null;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
  });
}

export default server;
