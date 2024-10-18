import app from "./app";
import prisma from "./prisma/prismaClient";
import { PORT } from "./constants";


prisma
  .$connect()
  .then(() => {
    console.log("Connected to PostgreSQL via Prisma");
  })
  .catch((error: Error) => {
    console.error("Error connecting to database:", error);
    process.exit(1);
  });

const port = PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
