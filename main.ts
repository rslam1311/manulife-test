import express from "express";
import mongoose from "mongoose";
import path from "path";
import * as salesRecordServices from "./services/salesRecord";

const app = express();
const port = 3080;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/sales/report", async (req, res) => {
  const { data, error } = await salesRecordServices.getSalesRecord(
    req.query.from as string,
    req.query.to as string
  );

  if (!!error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ data });
});

app.post("/", async (req, res) => {
  salesRecordServices
    .saveCsvDataToDb(req)
    .then((successResponse) => res.status(200).json(successResponse))
    .catch((errorResponse) => res.status(400).json(errorResponse));
});

mongoose
  .connect("mongodb://root:example@mongo:27017/", { dbName: "test" })
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at https://localhost:${port}`);
    });
  })
  .catch((err) => console.log("Db connection failed", err));
