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
exports.getSalesRecord = void 0;
const SalesRecord_1 = require("./model/SalesRecord");
const utils_1 = require("./utils");
const addDays_1 = __importDefault(require("date-fns/addDays"));
const getSalesRecord = (from, to) => {
    if (!from && !to) {
        return getAllSalesRecord();
    }
    if (!from || !to) {
        return getSalesRecordFromSingleDate((from !== null && from !== void 0 ? from : to));
    }
    return getSalesRecordFromDateRage(from, to);
};
exports.getSalesRecord = getSalesRecord;
const getSalesRecordFromDateRage = (from, to) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        utils_1.validations.validateGetSalesRecordDto(from, to);
        const fromDate = new Date(from);
        const toDate = new Date(to);
        const query = {
            $and: [
                { lastPurchaseDate: { $gte: fromDate } },
                { lastPurchaseDate: { $lte: toDate } },
            ],
        };
        const data = yield SalesRecord_1.SalesRecordModel.find(query).lean();
        return { error: null, data };
    }
    catch (error) {
        return { error, data: null };
    }
});
const getSalesRecordFromSingleDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetDate = new Date(date);
        utils_1.validations.validateDate(targetDate);
        const query = {
            $and: [
                { lastPurchaseDate: { $gte: targetDate } },
                { lastPurchaseDate: { $lte: (0, addDays_1.default)(targetDate, 1) } },
            ],
        };
        const data = yield SalesRecord_1.SalesRecordModel.find(query).lean();
        return { error: null, data };
    }
    catch (error) {
        return { error, data: null };
    }
});
const getAllSalesRecord = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield SalesRecord_1.SalesRecordModel.find({}).lean();
        return { error: null, data };
    }
    catch (error) {
        return { error, data: null };
    }
});
