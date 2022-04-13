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
Object.defineProperty(exports, "__esModule", { value: true });
const createValidDbObj_1 = require("./createValidDbObj");
describe.only("Csv validations", () => {
    const csvRow = {
        username: "John Doe",
        age: "29",
        height: "177",
        gender: "M",
        saleAmount: "21312",
        lastPurchaseDate: "2020-11-05T13:15:30Z",
    };
    it("valid data", () => __awaiter(void 0, void 0, void 0, function* () {
        const { dbObj, error } = (0, createValidDbObj_1.createValidDbObj)(csvRow);
        expect(error).toBe(null);
    }));
    it("invalid username", () => __awaiter(void 0, void 0, void 0, function* () {
        const { dbObj, error } = (0, createValidDbObj_1.createValidDbObj)(Object.assign(Object.assign({}, csvRow), { username: "" }));
        expect(error).toBeTruthy();
    }));
    it("invalid age", () => __awaiter(void 0, void 0, void 0, function* () {
        const { error: err1 } = (0, createValidDbObj_1.createValidDbObj)(Object.assign(Object.assign({}, csvRow), { age: "sdf" }));
        const { error: err2 } = (0, createValidDbObj_1.createValidDbObj)(Object.assign(Object.assign({}, csvRow), { age: "0" }));
        const { error: err3 } = (0, createValidDbObj_1.createValidDbObj)(Object.assign(Object.assign({}, csvRow), { age: "100" }));
        expect(err1).toBeTruthy();
        expect(err2).toBeTruthy();
        expect(err3).toBeTruthy();
    }));
    it("invalid height", () => __awaiter(void 0, void 0, void 0, function* () {
        const { error: err1 } = (0, createValidDbObj_1.createValidDbObj)(Object.assign(Object.assign({}, csvRow), { height: "sdf" }));
        const { error: err2 } = (0, createValidDbObj_1.createValidDbObj)(Object.assign(Object.assign({}, csvRow), { height: "0" }));
        const { error: err3 } = (0, createValidDbObj_1.createValidDbObj)(Object.assign(Object.assign({}, csvRow), { height: "300" }));
        expect(err1).toBeTruthy();
        expect(err2).toBeTruthy();
        expect(err3).toBeTruthy();
    }));
    it("invalid gender", () => __awaiter(void 0, void 0, void 0, function* () {
        const { error: err1 } = (0, createValidDbObj_1.createValidDbObj)(Object.assign(Object.assign({}, csvRow), { gender: "sdf" }));
        const { error: err2 } = (0, createValidDbObj_1.createValidDbObj)(Object.assign(Object.assign({}, csvRow), { gender: "" }));
        expect(err1).toBeTruthy();
        expect(err2).toBeTruthy();
    }));
    it("invalid sale amount", () => __awaiter(void 0, void 0, void 0, function* () {
        const { error: err1 } = (0, createValidDbObj_1.createValidDbObj)(Object.assign(Object.assign({}, csvRow), { saleAmount: "" }));
        const { error: err2 } = (0, createValidDbObj_1.createValidDbObj)(Object.assign(Object.assign({}, csvRow), { saleAmount: "-123123" }));
        expect(err1).toBeTruthy();
        expect(err2).toBeTruthy();
    }));
    it("invalid last purchase date", () => __awaiter(void 0, void 0, void 0, function* () {
        const { error: err1 } = (0, createValidDbObj_1.createValidDbObj)(Object.assign(Object.assign({}, csvRow), { lastPurchaseDate: "2022-11-05T13:15:30Z" }));
        const { error: err2 } = (0, createValidDbObj_1.createValidDbObj)(Object.assign(Object.assign({}, csvRow), { lastPurchaseDate: "1900-11-05T13:15:30Z" }));
        const { error: err3 } = (0, createValidDbObj_1.createValidDbObj)(Object.assign(Object.assign({}, csvRow), { lastPurchaseDate: "202010" }));
        expect(err1).toBeTruthy();
        expect(err2).toBeTruthy();
        expect(err3).toBeTruthy();
    }));
});
