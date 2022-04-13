import mongoose from "mongoose";

export const connectDb = (dbName: string) => {
  return mongoose.connect("mongodb://root:example@mongo:27017/", {
    dbName,
  });
};
