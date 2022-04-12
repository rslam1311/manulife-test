"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("@fast-csv/format");
const path_1 = __importDefault(require("path"));
const generateRows = () => {
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
(0, format_1.writeToPath)(path_1.default.resolve(__dirname, "mock.csv"), rows)
    .on("error", (err) => console.error(err))
    .on("finish", () => console.log("Done writing."));
