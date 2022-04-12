type CsvRowKey =
  | "username"
  | "age"
  | "height"
  | "gender"
  | "saleAmount"
  | "lastPurchaseDate";

export type CsvRow = Record<CsvRowKey, string>;

export type SalesRecord = {
  username: string;
  age: number;
  height: number;
  gender: string;
  saleAmount: number;
  lastPurchaseDate: Date;
};
