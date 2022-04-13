import express from "express";
import path from "path";
import salesRouter from "./routers/sales";
import { connectDb } from "./utils/connectDb";

const app = express();
const port = 3080;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.use("/sales", salesRouter);

connectDb("test")
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at https://localhost:${port}`);
    });
  })
  .catch((err) => console.log("Db connection failed", err));
