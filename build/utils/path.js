"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilepath = void 0;
const path_1 = __importDefault(require("path"));
const normalCsvFilepath = path_1.default.join(__dirname, "../mock.csv");
const tsFilepath = path_1.default.join(__dirname, "../main.ts");
const invalidCsvFilepath = path_1.default.join(__dirname, "../invalid.csv");
const getFilepath = (variant) => {
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
exports.getFilepath = getFilepath;
