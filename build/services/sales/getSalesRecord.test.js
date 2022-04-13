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
const mongoose_1 = __importDefault(require("mongoose"));
const SalesRecord_1 = require("./model/SalesRecord");
const getSalesRecord_1 = require("./getSalesRecord");
const connectDb_1 = require("../../utils/connectDb");
describe("getSalesRecord", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, connectDb_1.connectDb)("testing");
        yield SalesRecord_1.SalesRecordModel.deleteMany();
        const mockData = [
            {
                username: "John Doe",
                age: 29,
                height: 177,
                gender: "M",
                saleAmount: 21312,
                lastPurchaseDate: new Date("2020-11-05T13:15:30Z"),
            },
            {
                username: "Jane Doe",
                age: 32,
                height: 187,
                gender: "F",
                saleAmount: 5342,
                lastPurchaseDate: new Date("2019-12-05T13:15:30+08:00"),
            },
        ];
        yield SalesRecord_1.SalesRecordModel.insertMany(mockData);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
    }));
    it("getSalesRecord - no query", () => __awaiter(void 0, void 0, void 0, function* () {
        const { error, data } = yield (0, getSalesRecord_1.getSalesRecord)(undefined, undefined);
        expect(error).toBe(null);
        expect(data === null || data === void 0 ? void 0 : data.length).toBe(2);
        expect(data).toEqual(expect.arrayContaining([
            expect.objectContaining({
                username: "Jane Doe",
            }),
            expect.objectContaining({
                username: "John Doe",
            }),
        ]));
    }));
    it("getSalesRecord - single date (from)", () => __awaiter(void 0, void 0, void 0, function* () {
        const { error, data } = yield (0, getSalesRecord_1.getSalesRecord)("2020-11-05", undefined);
        expect(error).toBe(null);
        expect(data === null || data === void 0 ? void 0 : data.length).toBe(1);
        expect(data).toEqual(expect.arrayContaining([
            expect.objectContaining({
                username: "John Doe",
            }),
        ]));
    }));
    it("getSalesRecord - single date (to)", () => __awaiter(void 0, void 0, void 0, function* () {
        const { error, data } = yield (0, getSalesRecord_1.getSalesRecord)(undefined, "2020-11-05");
        expect(error).toBe(null);
        expect(data === null || data === void 0 ? void 0 : data.length).toBe(1);
        expect(data).toEqual(expect.arrayContaining([
            expect.objectContaining({
                username: "John Doe",
            }),
        ]));
    }));
    it("getSalesRecord - date range", () => __awaiter(void 0, void 0, void 0, function* () {
        const { error, data } = yield (0, getSalesRecord_1.getSalesRecord)("2019-12-04", "2019-12-06");
        expect(error).toBe(null);
        expect(data === null || data === void 0 ? void 0 : data.length).toBe(1);
        expect(data).toEqual(expect.arrayContaining([
            expect.objectContaining({
                username: "Jane Doe",
            }),
        ]));
    }));
    it("getSalesRecord - invalid from", () => __awaiter(void 0, void 0, void 0, function* () {
        const { error, data } = yield (0, getSalesRecord_1.getSalesRecord)("2100-12-04", "2019-12-06");
        expect(error).toBeTruthy();
        expect(data).toBe(null);
    }));
    it("getSalesRecord - invalid to", () => __awaiter(void 0, void 0, void 0, function* () {
        const { error, data } = yield (0, getSalesRecord_1.getSalesRecord)("2019-12-04", "2100-12-06");
        expect(error).toBeTruthy();
        expect(data).toBe(null);
    }));
    it("getSalesRecord - invalid date range", () => __awaiter(void 0, void 0, void 0, function* () {
        const { error, data } = yield (0, getSalesRecord_1.getSalesRecord)("2021-12-04", "2019-12-06");
        expect(error).toBeTruthy();
        expect(data).toBe(null);
    }));
});
