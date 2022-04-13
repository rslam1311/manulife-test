import express from "express";
import path from "path";
import salesRouter from "./routers/sales";

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.use("/sales", salesRouter);

export default app;
