import { CsvRow, SalesRecord } from "../interface/interface";
import { validations } from ".";

export const createValidDbObj = (
  row: CsvRow
): { dbObj: SalesRecord | null; error: Error | null } => {
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
  } catch (error: any) {
    return { dbObj: null, error };
  }
};

const convertStrToNumber = (target: string) => {
  const result = parseInt(target);
  if (isNaN(result)) throw new Error("Invalid Number");
  return result;
};

const validateDbObj = (obj: SalesRecord) => {
  const { username, age, height, gender, saleAmount, lastPurchaseDate } = obj;
  const {
    validateUsername,
    validateAge,
    validateGender,
    validateHeight,
    validateDate,
    validateSaleAmount,
  } = validations;

  validateUsername(username);
  validateAge(age);
  validateHeight(height);
  validateGender(gender);
  validateSaleAmount(saleAmount);
  validateDate(lastPurchaseDate);
};
