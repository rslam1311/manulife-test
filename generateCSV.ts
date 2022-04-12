import { writeToPath } from "@fast-csv/format";
import path from "path";

const generateRows = (): (string | number)[][] => {
  const header = [
    "username",
    "age",
    "height",
    "gender",
    "saleAmount",
    "lastPurchaseDate",
  ];

  const data1 = ["John Doe", 29, 177, "M", 21312, "2020-11-05T13:15:30Z"];
  const data2 = ["Jane Doe", 32, 187, "f", 5342, "2019-12-05T13:15:30+08:00"];

  const rows = [header, data1, data2];

  return rows;
};

const rows = generateRows();

writeToPath(path.resolve(__dirname, "mock.csv"), rows)
  .on("error", (err) => console.error(err))
  .on("finish", () => console.log("Done writing."));
