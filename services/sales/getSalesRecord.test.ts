import mongoose from "mongoose";
import { SalesRecordModel } from "./model/SalesRecord";
import { getSalesRecord } from "./getSalesRecord";
import { connectDb } from "../../utils/connectDb";

describe("getSalesRecord", () => {
  beforeAll(async () => {
    await connectDb("testing");

    await SalesRecordModel.deleteMany();

    const mockData = [
      {
        username: "John Doe",
        age: 29,
        height: 177,
        gender: "M",
        saleAmount: 21312,
        lastPurchaseDate: new Date("2020-11-05T13:15:30Z"),
      },
      {
        username: "Jane Doe",
        age: 32,
        height: 187,
        gender: "F",
        saleAmount: 5342,
        lastPurchaseDate: new Date("2019-12-05T13:15:30+08:00"),
      },
    ];

    await SalesRecordModel.insertMany(mockData);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("getSalesRecord - no query", async () => {
    const { error, data } = await getSalesRecord(undefined, undefined);

    expect(error).toBe(null);
    expect(data?.length).toBe(2);
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          username: "Jane Doe",
        }),
        expect.objectContaining({
          username: "John Doe",
        }),
      ])
    );
  });

  it("getSalesRecord - single date (from)", async () => {
    const { error, data } = await getSalesRecord("2020-11-05", undefined);

    expect(error).toBe(null);
    expect(data?.length).toBe(1);
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          username: "John Doe",
        }),
      ])
    );
  });

  it("getSalesRecord - single date (to)", async () => {
    const { error, data } = await getSalesRecord(undefined, "2020-11-05");

    expect(error).toBe(null);
    expect(data?.length).toBe(1);
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          username: "John Doe",
        }),
      ])
    );
  });

  it("getSalesRecord - date range", async () => {
    const { error, data } = await getSalesRecord("2019-12-04", "2019-12-06");

    expect(error).toBe(null);
    expect(data?.length).toBe(1);
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          username: "Jane Doe",
        }),
      ])
    );
  });

  it("getSalesRecord - invalid from", async () => {
    const { error, data } = await getSalesRecord("2100-12-04", "2019-12-06");
    expect(error).toBeTruthy();
    expect(data).toBe(null);
  });

  it("getSalesRecord - invalid to", async () => {
    const { error, data } = await getSalesRecord("2019-12-04", "2100-12-06");
    expect(error).toBeTruthy();
    expect(data).toBe(null);
  });

  it("getSalesRecord - invalid date range", async () => {
    const { error, data } = await getSalesRecord("2021-12-04", "2019-12-06");
    expect(error).toBeTruthy();
    expect(data).toBe(null);
  });
});
