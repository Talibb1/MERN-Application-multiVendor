import app from "./app";
import { PORT } from "./config/env";
import logger from './logs/logger';

const port = PORT || 5000;

const startServer = () => {
  try {
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}.`);
      logger.info(`Server started on port ${port}`); 
    });
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      switch (error.code) {
        case 'EACCES':
          console.error(`Port ${port} requires elevated privileges.`);
          logger.error(`Port ${port} requires elevated privileges.`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(`Port ${port} is already in use.`);
          logger.error(`Port ${port} is already in use.`);
          process.exit(1); 
          break;
        default:
          throw error;
      }
    });

  } catch (error) {
    console.error("Failed to start the server: ", error);
    logger.error("Failed to start the server", { error });
    process.exit(1);
  }
};

startServer();