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
const SalesRecord_1 = require("../services/sales/model/SalesRecord");
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const connectDb_1 = require("../utils/connectDb");
const fs_1 = require("fs");
const path_1 = require("../utils/path");
describe("endpoint - /sales/report", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, connectDb_1.connectDb)("testing");
        yield SalesRecord_1.SalesRecordModel.deleteMany();
        const mockData = [
            {
                username: "user1",
                age: 29,
                height: 170,
                gender: "M",
                saleAmount: 123456,
                lastPurchaseDate: new Date("2020-11-05T13:15:30Z"),
            },
            {
                username: "user2",
                age: 32,
                height: 165,
                gender: "F",
                saleAmount: 3522,
                lastPurchaseDate: new Date("2019-11-05T13:15:30Z"),
            },
        ];
        yield SalesRecord_1.SalesRecordModel.insertMany(mockData);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield SalesRecord_1.SalesRecordModel.deleteMany();
        yield mongoose_1.default.disconnect();
    }));
    it("getAllRecords", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get("/sales/report");
        expect(res.body).toEqual(expectUsers("user1", "user2"));
    }));
    it("get records on a particular day", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get("/sales/report?from=2019-11-05");
        expect(res.body).toEqual(expectUsers("user2"));
    }));
    it("get records on within a day range", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get("/sales/report?from=2017-11-05&to=2020-05-05");
        expect(res.body).toEqual(expectUsers("user2"));
    }));
    it("get records with invalid from", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get("/sales/report?from=1234");
        expect(res.status).toEqual(400);
        expect(res.body).toEqual(expectError("Invalid Date"));
    }));
    it("get records with invalid to", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get("/sales/report?to=1234");
        expect(res.status).toEqual(400);
        expect(res.body).toEqual(expectError("Invalid Date"));
    }));
    it("get records with to smaller than from", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get("/sales/report?from=2020-11-05&to=2019-11-05");
        expect(res.status).toEqual(400);
        expect(res.body).toEqual(expectError("The date To must be larger than From"));
    }));
});
describe("endpoint - /sales/record", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, connectDb_1.connectDb)("testing");
        yield SalesRecord_1.SalesRecordModel.deleteMany();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield SalesRecord_1.SalesRecordModel.deleteMany();
        yield mongoose_1.default.disconnect();
    }));
    it("send a normal file", () => __awaiter(void 0, void 0, void 0, function* () {
        const buffer = (0, fs_1.readFileSync)((0, path_1.getFilepath)("normal"));
        const postRes = yield (0, supertest_1.default)(server_1.default).post(`/sales/record`).send(buffer);
        expect(postRes.body).toEqual(expectStatus("success"));
        const getRes = yield (0, supertest_1.default)(server_1.default).get("/sales/report");
        expect(getRes.body).toEqual(expectUsers("John Doe", "Jane Doe"));
    }));
    it("send wrong file format", () => __awaiter(void 0, void 0, void 0, function* () {
        const buffer = (0, fs_1.readFileSync)((0, path_1.getFilepath)("wrong format"));
        const req = yield (0, supertest_1.default)(server_1.default).post(`/sales/record`).send(buffer);
        expect(req.body).toEqual(expectStatus("error"));
    }));
    it("send invalid data csv format", () => __awaiter(void 0, void 0, void 0, function* () {
        const buffer = (0, fs_1.readFileSync)((0, path_1.getFilepath)("invalid"));
        const req = yield (0, supertest_1.default)(server_1.default).post(`/sales/record`).send(buffer);
        expect(req.body).toEqual(expectStatus("error"));
    }));
});
const expectUsers = (...username) => ({
    data: username.map((name) => expect.objectContaining({
        username: name,
    })),
});
const expectError = (errMsg) => ({
    error: errMsg,
});
const expectStatus = (status) => expect.objectContaining({
    status,
});
