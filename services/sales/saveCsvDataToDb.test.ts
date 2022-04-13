import { createReadStream } from "fs";
import mongoose from "mongoose";
import { SalesRecordModel } from "./model/SalesRecord";
import { saveCsvDataToDb } from "./saveCsvDataToDb";
import path from "path";
import { connectDb } from "../../utils/connectDb";

type FileVariant = "normal" | "wrong format" | "";

const getFilename = (variant: FileVariant) => {
  switch (variant) {
    case "normal":
      return "mock.csv";
    case "wrong format":
      return "main.ts";
  }
};

const getMockReq = (variant: FileVariant) => {
  const filename = getFilename(variant);
  const filepath = path.join(__dirname, `../../${filename}`);
  return createReadStream(filepath);
};

describe("saveCsvDataToDb", () => {
  beforeAll(async () => {
    await connectDb("testing");
  });

  beforeEach(async () => {
    await SalesRecordModel.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("saveCsvDataToDb", async () => {
    const mockReq = getMockReq("normal");

    const { status, msg } = await saveCsvDataToDb(mockReq as any);

    expect(status).toBe("success");

    const insertedData = await SalesRecordModel.find().lean();
    expect(insertedData.length).toBe(2);
  });

  it("saveCsvDataToDb - wrong file", async () => {
    const mockReq = getMockReq("wrong format");

    try {
      await saveCsvDataToDb(mockReq as any);
    } catch (e) {
      expect(e).toEqual(expect.objectContaining({ status: "error" }));
    }
  });
});
