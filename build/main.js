"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const connectDb_1 = require("./utils/connectDb");
const port = 3080;
(0, connectDb_1.connectDb)("test")
    .then(() => {
    server_1.default.listen(port, () => {
        console.log(`[server]: Server is running at https://localhost:${port}`);
    });
})
    .catch((err) => console.log("Db connection failed", err));
