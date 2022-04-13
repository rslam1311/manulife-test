import express, { Request, Response } from "express";
import * as salesRecordServices from "../services/sales";

export const getRecords = async (req: Request, res: Response) => {
  const { data, error } = await salesRecordServices.getSalesRecord(
    req.query.from as string,
    req.query.to as string
  );

  if (!!error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ data });
};

export const insertRecords = async (req: Request, res: Response) => {
  salesRecordServices
    .saveCsvDataToDb(req)
    .then((successResponse) => res.status(200).json(successResponse))
    .catch((errorResponse) => res.status(400).json(errorResponse));
};

const router = express.Router();

router.get("/report", getRecords);
router.post("/record", insertRecords);

export default router;
