import app from "./server";
import { connectDb } from "./utils/connectDb";

const port = 3080;

connectDb("test")
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at https://localhost:${port}`);
    });
  })
  .catch((err) => console.log("Db connection failed", err));
