import app from "./app";
import { PORT } from "./config/env";

const port = PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
