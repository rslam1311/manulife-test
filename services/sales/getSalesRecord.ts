import { SalesRecordModel } from "./model/SalesRecord";
import { validations } from "./utils";
import addDays from "date-fns/addDays";

export const getSalesRecord = (
  from: string | undefined,
  to: string | undefined
) => {
  if (!from && !to) {
    return getAllSalesRecord();
  }

  if (!from || !to) {
    return getSalesRecordFromSingleDate((from ?? to)!);
  }

  return getSalesRecordFromDateRage(from, to);
};

const getSalesRecordFromDateRage = async (from: string, to: string) => {
  try {
    validations.validateGetSalesRecordDto(from, to);

    const fromDate = new Date(from);
    const toDate = new Date(to);

    const query = {
      $and: [
        { lastPurchaseDate: { $gte: fromDate } },
        { lastPurchaseDate: { $lte: toDate } },
      ],
    };

    const data = await SalesRecordModel.find(query).lean();

    return { error: null, data };
  } catch (error: any) {
    return { error, data: null };
  }
};

const getSalesRecordFromSingleDate = async (date: string) => {
  try {
    const targetDate = new Date(date);
    validations.validateDate(targetDate);

    const query = {
      $and: [
        { lastPurchaseDate: { $gte: targetDate } },
        { lastPurchaseDate: { $lte: addDays(targetDate, 1) } },
      ],
    };

    const data = await SalesRecordModel.find(query).lean();

    return { error: null, data };
  } catch (error: any) {
    return { error, data: null };
  }
};

const getAllSalesRecord = async () => {
  try {
    const data = await SalesRecordModel.find({}).lean();

    return { error: null, data };
  } catch (error: any) {
    return { error, data: null };
  }
};
