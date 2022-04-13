import path from "path";

export type FileVariant = "normal" | "wrong format" | "invalid";

const normalCsvFilepath = path.join(__dirname, "../mock.csv");
const tsFilepath = path.join(__dirname, "../main.ts");
const invalidCsvFilepath = path.join(__dirname, "../invalid.csv");

export const getFilepath = (variant: FileVariant) => {
  switch (variant) {
    case "normal":
      return normalCsvFilepath;
    case "wrong format":
      return tsFilepath;
    case "invalid":
      return invalidCsvFilepath;
    default:
      return "";
  }
};
