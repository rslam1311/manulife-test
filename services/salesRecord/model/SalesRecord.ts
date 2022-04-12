import mongoose from "mongoose";
import { SalesRecord } from "../interface/interface";

export type SalesRecordDoc = SalesRecord & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export const salesRecordSchema = new mongoose.Schema(
  {
    username: { type: String },
    age: { type: Number },
    height: Number,
    gender: { type: String, enum: ["M", "F"] },
    saleAmount: Number,
    lastPurchaseDate: { type: Date, unique: true },
  },
  { timestamps: true }
);

export const SalesRecordModel = (mongoose.models.SalesRecordModel ??
  mongoose.model("SalesRecord", salesRecordSchema)) as mongoose.Model<
  SalesRecordDoc & Document
>;
