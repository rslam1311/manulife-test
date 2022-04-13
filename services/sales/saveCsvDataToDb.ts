import { CsvRow, SalesRecord } from "./interface/interface";
import { createValidDbObj } from "./utils";
import { Request } from "express";
import * as csv from "fast-csv";
import { SalesRecordModel } from "./model/SalesRecord";

export const saveCsvDataToDb = (req: Request) =>
  new Promise<{ status: string; msg: string }>((resolve, reject) => {
    let data: SalesRecord[] = [];

    const saveToDbAndResetData = async (isLastBatch: boolean) => {
      const shouldSkip =
        (!isLastBatch && data.length <= 100) || data.length === 0;

      if (shouldSkip) return { error: null };

      try {
        await SalesRecordModel.insertMany(data);

        data = [];

        return { error: null };
      } catch (error: any) {
        return { error };
      }
    };

    const onError = (error: Error) =>
      reject({
        status: "error",
        msg: error.message,
        firstItemOnBatch: data[0]?.lastPurchaseDate,
      });

    const onEnd = async (rowCount: number) => {
      const isLastBatch = true;
      const { error } = await saveToDbAndResetData(isLastBatch);

      if (error) {
        onError(error);
        return;
      }

      const msg = `Parsed ${rowCount} rows`;

      resolve({ status: "success", msg });
    };

    req
      .pipe(csv.parse<CsvRow, CsvRow>({ headers: true, trim: true }))
      .transform(async (row, next) => {
        const { error: dbObjErr, dbObj } = createValidDbObj(row);

        /* fail validation */
        if (dbObjErr || !dbObj) {
          next(new Error(dbObjErr?.message + " on " + JSON.stringify(row)));
          return;
        }

        data.push(dbObj);

        const isLastBatch = false;
        const { error } = await saveToDbAndResetData(isLastBatch);

        if (error) {
          next(error);
          return;
        }

        return next(null, row);
      })
      .on("error", onError)
      .on("data", () => {})
      .on("end", onEnd);
  });
