import mongoose from "mongoose";

export const connectDb = (dbName: string) => {
  //run test will connected via localhost
  const network = process.env.NETWORK === "local" ? "localhost" : "mongo";

  return mongoose.connect(`mongodb://root:example@${network}:27017/`, {
    dbName,
  });
};
