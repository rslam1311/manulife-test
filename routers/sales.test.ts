import { SalesRecordModel } from "../services/sales/model/SalesRecord";
import mongoose from "mongoose";
import request from "supertest";
import app from "../server";
import { connectDb } from "../utils/connectDb";
import { readFileSync } from "fs";
import { getFilepath } from "../utils/path";

describe("endpoint - /sales/report", () => {
  beforeAll(async () => {
    await connectDb("testing");

    await SalesRecordModel.deleteMany();

    const mockData = [
      {
        username: "user1",
        age: 29,
        height: 170,
        gender: "M",
        saleAmount: 123456,
        lastPurchaseDate: new Date("2020-11-05T13:15:30Z"),
      },
      {
        username: "user2",
        age: 32,
        height: 165,
        gender: "F",
        saleAmount: 3522,
        lastPurchaseDate: new Date("2019-11-05T13:15:30Z"),
      },
    ];

    await SalesRecordModel.insertMany(mockData);
  });

  afterAll(async () => {
    await SalesRecordModel.deleteMany();
    await mongoose.disconnect();
  });

  it("getAllRecords", async () => {
    const res = await request(app).get("/sales/report");

    expect(res.body).toEqual(expectUsers("user1", "user2"));
  });

  it("get records on a particular day", async () => {
    const res = await request(app).get("/sales/report?from=2019-11-05");

    expect(res.body).toEqual(expectUsers("user2"));
  });

  it("get records on within a day range", async () => {
    const res = await request(app).get(
      "/sales/report?from=2017-11-05&to=2020-05-05"
    );

    expect(res.body).toEqual(expectUsers("user2"));
  });

  it("get records with invalid from", async () => {
    const res = await request(app).get("/sales/report?from=1234");

    expect(res.status).toEqual(400);
    expect(res.body).toEqual(expectError("Invalid Date"));
  });

  it("get records with invalid to", async () => {
    const res = await request(app).get("/sales/report?to=1234");

    expect(res.status).toEqual(400);
    expect(res.body).toEqual(expectError("Invalid Date"));
  });

  it("get records with to smaller than from", async () => {
    const res = await request(app).get(
      "/sales/report?from=2020-11-05&to=2019-11-05"
    );

    expect(res.status).toEqual(400);
    expect(res.body).toEqual(
      expectError("The date To must be larger than From")
    );
  });
});

describe("endpoint - /sales/record", () => {
  beforeAll(async () => {
    await connectDb("testing");

    await SalesRecordModel.deleteMany();
  });

  afterAll(async () => {
    await SalesRecordModel.deleteMany();
    await mongoose.disconnect();
  });

  it("send a normal file", async () => {
    const buffer = readFileSync(getFilepath("normal"));

    const postRes = await request(app).post(`/sales/record`).send(buffer);
    expect(postRes.body).toEqual(expectStatus("success"));

    const getRes = await request(app).get("/sales/report");

    expect(getRes.body).toEqual(expectUsers("John Doe", "Jane Doe"));
  });

  it("send wrong file format", async () => {
    const buffer = readFileSync(getFilepath("wrong format"));

    const req = await request(app).post(`/sales/record`).send(buffer);
    expect(req.body).toEqual(expectStatus("error"));
  });

  it("send invalid data csv format", async () => {
    const buffer = readFileSync(getFilepath("invalid"));

    const req = await request(app).post(`/sales/record`).send(buffer);
    expect(req.body).toEqual(expectStatus("error"));
  });
});

const expectUsers = (...username: string[]) => ({
  data: username.map((name) =>
    expect.objectContaining({
      username: name,
    })
  ),
});

const expectError = (errMsg: string) => ({
  error: errMsg,
});

const expectStatus = (status: "success" | "error") =>
  expect.objectContaining({
    status,
  });
