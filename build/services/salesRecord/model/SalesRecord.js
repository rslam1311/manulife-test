"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRecordModel = exports.salesRecordSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.salesRecordSchema = new mongoose_1.default.Schema({
    username: { type: String },
    age: { type: Number },
    height: Number,
    gender: { type: String, enum: ["M", "F"] },
    saleAmount: Number,
    lastPurchaseDate: { type: Date, unique: true },
}, { timestamps: true });
exports.SalesRecordModel = ((_a = mongoose_1.default.models.SalesRecordModel) !== null && _a !== void 0 ? _a : mongoose_1.default.model("SalesRecord", exports.salesRecordSchema));
