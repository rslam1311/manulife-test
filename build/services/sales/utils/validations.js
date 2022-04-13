"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetSalesRecordDto = exports.validateDate = exports.validateSaleAmount = exports.validateGender = exports.validateHeight = exports.validateAge = exports.validateUsername = void 0;
const validateUsername = (username) => {
    if (!username.trim())
        throw new Error("Invalid Username");
};
exports.validateUsername = validateUsername;
const validateAge = (age) => {
    if (age <= 6 || age >= 100)
        throw new Error("Invalid Age");
};
exports.validateAge = validateAge;
const validateHeight = (height) => {
    if (height <= 100 || height >= 250)
        throw new Error("Invalid Height");
};
exports.validateHeight = validateHeight;
const validateGender = (gender) => {
    if (gender !== "M" && gender !== "F")
        throw new Error("Invalid Gender");
};
exports.validateGender = validateGender;
const validateSaleAmount = (saleAmount) => {
    if (saleAmount <= 0)
        throw new Error("Invalid SaleAmount");
};
exports.validateSaleAmount = validateSaleAmount;
const validateDate = (date) => {
    const milliSecondsInUTC = date.valueOf();
    if (milliSecondsInUTC > new Date().valueOf() ||
        milliSecondsInUTC < 0 ||
        isNaN(milliSecondsInUTC))
        throw new Error("Invalid Date");
};
exports.validateDate = validateDate;
const validateGetSalesRecordDto = (from, to) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const fromTimeValue = fromDate.valueOf();
    const toTimeValue = toDate.valueOf();
    if (fromTimeValue > toTimeValue)
        throw new Error("The date To must be larger than From");
    (0, exports.validateDate)(fromDate);
    (0, exports.validateDate)(toDate);
};
exports.validateGetSalesRecordDto = validateGetSalesRecordDto;
