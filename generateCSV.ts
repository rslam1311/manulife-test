import { writeToPath } from "@fast-csv/format";
import path from "path";

const header = [
  "username",
  "age",
  "height",
  "gender",
  "saleAmount",
  "lastPurchaseDate",
];

const generateMockCsv = () =>
  new Promise((resolve, reject) => {
    const data1 = ["John Doe", 29, 177, "M", 21312, "2020-11-05T13:15:30Z"];
    const data2 = ["Jane Doe", 32, 187, "f", 5342, "2019-12-05T13:15:30+08:00"];
    const rows = [header, data1, data2];

    writeToPath(path.resolve(__dirname, "mock.csv"), rows)
      .on("error", (err) => reject(err))
      .on("finish", () => resolve("Done MockCsv"));
  });

const generateInvalidCsv = () =>
  new Promise((resolve, reject) => {
    const data1 = ["John Doe", 29, 177, "M", 21312, "2020-11-05T13:15:30Z"];
    const data2 = ["", 32, 187, "f", 5342, "2019-12-05T13:15:30+08:00"];
    const rows = [header, data1, data2];

    writeToPath(path.resolve(__dirname, "invalid.csv"), rows)
      .on("error", (err) => reject(err))
      .on("finish", () => resolve("Done InvalidCsv"));
  });

const generateCvs = async () => {
  await Promise.all([generateMockCsv(), generateInvalidCsv()]);
};

generateCvs();
