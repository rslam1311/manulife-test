"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("@fast-csv/format");
const path_1 = __importDefault(require("path"));
const header = [
    "username",
    "age",
    "height",
    "gender",
    "saleAmount",
    "lastPurchaseDate",
];
const generateMockCsv = () => new Promise((resolve, reject) => {
    const data1 = ["John Doe", 29, 177, "M", 21312, "2020-11-05T13:15:30Z"];
    const data2 = ["Jane Doe", 32, 187, "f", 5342, "2019-12-05T13:15:30+08:00"];
    const rows = [header, data1, data2];
    (0, format_1.writeToPath)(path_1.default.resolve(__dirname, "mock.csv"), rows)
        .on("error", (err) => reject(err))
        .on("finish", () => resolve("Done MockCsv"));
});
const generateInvalidCsv = () => new Promise((resolve, reject) => {
    const data1 = ["John Doe", 29, 177, "M", 21312, "2020-11-05T13:15:30Z"];
    const data2 = ["", 32, 187, "f", 5342, "2019-12-05T13:15:30+08:00"];
    const rows = [header, data1, data2];
    (0, format_1.writeToPath)(path_1.default.resolve(__dirname, "invalid.csv"), rows)
        .on("error", (err) => reject(err))
        .on("finish", () => resolve("Done InvalidCsv"));
});
const generateCvs = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([generateMockCsv(), generateInvalidCsv()]);
});
generateCvs();
