import { createReadStream } from "fs";
import mongoose from "mongoose";
import { SalesRecordModel } from "./model/SalesRecord";
import { saveCsvDataToDb } from "./saveCsvDataToDb";
import { connectDb } from "../../utils/connectDb";
import { getFilepath } from "../../utils/path";
import type { FileVariant } from "../../utils/path";

const getMockReq = (variant: FileVariant) => {
  const filepath = getFilepath(variant);

  return createReadStream(filepath!);
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
