"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCsvDataToDb = void 0;
const utils_1 = require("./utils");
const csv = __importStar(require("fast-csv"));
const SalesRecord_1 = require("./model/SalesRecord");
const saveCsvDataToDb = (req) => new Promise((resolve, reject) => {
    let data = [];
    const saveToDbAndResetData = (isLastBatch) => __awaiter(void 0, void 0, void 0, function* () {
        const shouldSkip = (!isLastBatch && data.length <= 100) || data.length === 0;
        if (shouldSkip)
            return { error: null };
        try {
            yield SalesRecord_1.SalesRecordModel.insertMany(data);
            data = [];
            return { error: null };
        }
        catch (error) {
            return { error };
        }
    });
    const onError = (error) => {
        var _a;
        return reject({
            status: "error",
            msg: error.message,
            firstItemOnBatch: (_a = data[0]) === null || _a === void 0 ? void 0 : _a.lastPurchaseDate,
        });
    };
    const onEnd = (rowCount) => __awaiter(void 0, void 0, void 0, function* () {
        const isLastBatch = true;
        const { error } = yield saveToDbAndResetData(isLastBatch);
        if (error) {
            onError(error);
            return;
        }
        const msg = `Parsed ${rowCount} rows`;
        resolve({ status: "success", msg });
    });
    req
        .pipe(csv.parse({ headers: true, trim: true }))
        .transform((row, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { error: dbObjErr, dbObj } = (0, utils_1.createValidDbObj)(row);
        /* fail validation */
        if (dbObjErr || !dbObj) {
            next(new Error((dbObjErr === null || dbObjErr === void 0 ? void 0 : dbObjErr.message) + " on " + JSON.stringify(row)));
            return;
        }
        data.push(dbObj);
        const isLastBatch = false;
        const { error } = yield saveToDbAndResetData(isLastBatch);
        if (error) {
            next(error);
            return;
        }
        return next(null, row);
    }))
        .on("error", onError)
        .on("data", () => { })
        .on("end", onEnd);
});
exports.saveCsvDataToDb = saveCsvDataToDb;
