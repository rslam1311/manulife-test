"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidDbObj = void 0;
const _1 = require(".");
const createValidDbObj = (row) => {
    try {
        const { username, age, height, gender, saleAmount, lastPurchaseDate } = row;
        const dbObj = {
            username,
            age: convertStrToNumber(age),
            height: convertStrToNumber(height),
            gender: gender.toUpperCase(),
            saleAmount: convertStrToNumber(saleAmount),
            lastPurchaseDate: new Date(lastPurchaseDate),
        };
        validateDbObj(dbObj);
        return { dbObj, error: null };
    }
    catch (error) {
        return { dbObj: null, error };
    }
};
exports.createValidDbObj = createValidDbObj;
const convertStrToNumber = (target) => {
    const result = parseInt(target);
    if (isNaN(result))
        throw new Error("Invalid Number");
    return result;
};
const validateDbObj = (obj) => {
    const { username, age, height, gender, saleAmount, lastPurchaseDate } = obj;
    const { validateUsername, validateAge, validateGender, validateHeight, validateDate, validateSaleAmount, } = _1.validations;
    validateUsername(username);
    validateAge(age);
    validateHeight(height);
    validateGender(gender);
    validateSaleAmount(saleAmount);
    validateDate(lastPurchaseDate);
};
