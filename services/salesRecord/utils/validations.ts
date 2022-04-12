export const validateUsername = (username: string) => {
  if (!username.trim()) throw new Error("Invalid Username");
};

export const validateAge = (age: number) => {
  if (age <= 6 || age >= 100) throw new Error("Invalid Age");
};

export const validateHeight = (height: number) => {
  if (height <= 100 || height >= 250) throw new Error("Invalid Height");
};

export const validateGender = (gender: string) => {
  if (gender !== "M" && gender !== "F") throw new Error("Invalid Gender");
};

export const validateSaleAmount = (saleAmount: number) => {
  if (saleAmount <= 0) throw new Error("Invalid SaleAmount");
};

export const validateLastPurchaseDate = (lastPurchaseDate: Date) => {
  const milliSecondsInUTC = lastPurchaseDate.valueOf();
  if (milliSecondsInUTC > new Date().valueOf() || milliSecondsInUTC < 0)
    throw new Error("Invalid LastPurchaseDate");
};

export const validateGetSalesRecordDto = (from: string, to: string) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const fromTimeValue = fromDate.valueOf();
  const toTimeValue = toDate.valueOf();

  if (fromTimeValue > toTimeValue)
    throw new Error("The date To must be larger than From");

  validateLastPurchaseDate(fromDate);
  validateLastPurchaseDate(toDate);
};
