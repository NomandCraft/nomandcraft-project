const setupShutdownHandler = (server) => {
  process.on('SIGINT', () => {
    console.log('🛑 Server shutting down...');
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  });

  process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM, shutting down gracefully...');
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  });
};

export default setupShutdownHandler;
