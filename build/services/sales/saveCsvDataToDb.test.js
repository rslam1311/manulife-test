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
const fs_1 = require("fs");
const mongoose_1 = __importDefault(require("mongoose"));
const SalesRecord_1 = require("./model/SalesRecord");
const saveCsvDataToDb_1 = require("./saveCsvDataToDb");
const connectDb_1 = require("../../utils/connectDb");
const path_1 = require("../../utils/path");
const getMockReq = (variant) => {
    const filepath = (0, path_1.getFilepath)(variant);
    return (0, fs_1.createReadStream)(filepath);
};
describe("saveCsvDataToDb", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, connectDb_1.connectDb)("testing");
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield SalesRecord_1.SalesRecordModel.deleteMany();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
    }));
    it("saveCsvDataToDb", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockReq = getMockReq("normal");
        const { status, msg } = yield (0, saveCsvDataToDb_1.saveCsvDataToDb)(mockReq);
        expect(status).toBe("success");
        const insertedData = yield SalesRecord_1.SalesRecordModel.find().lean();
        expect(insertedData.length).toBe(2);
    }));
    it("saveCsvDataToDb - wrong file", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockReq = getMockReq("wrong format");
        try {
            yield (0, saveCsvDataToDb_1.saveCsvDataToDb)(mockReq);
        }
        catch (e) {
            expect(e).toEqual(expect.objectContaining({ status: "error" }));
        }
    }));
});
