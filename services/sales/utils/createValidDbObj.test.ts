import { createValidDbObj } from "./createValidDbObj";

describe.only("Csv validations", () => {
  const csvRow = {
    username: "John Doe",
    age: "29",
    height: "177",
    gender: "M",
    saleAmount: "21312",
    lastPurchaseDate: "2020-11-05T13:15:30Z",
  };

  it("valid data", async () => {
    const { dbObj, error } = createValidDbObj(csvRow);
    expect(error).toBe(null);
  });

  it("invalid username", async () => {
    const { dbObj, error } = createValidDbObj({ ...csvRow, username: "" });
    expect(error).toBeTruthy();
  });

  it("invalid age", async () => {
    const { error: err1 } = createValidDbObj({ ...csvRow, age: "sdf" });
    const { error: err2 } = createValidDbObj({ ...csvRow, age: "0" });
    const { error: err3 } = createValidDbObj({ ...csvRow, age: "100" });

    expect(err1).toBeTruthy();
    expect(err2).toBeTruthy();
    expect(err3).toBeTruthy();
  });

  it("invalid height", async () => {
    const { error: err1 } = createValidDbObj({ ...csvRow, height: "sdf" });
    const { error: err2 } = createValidDbObj({ ...csvRow, height: "0" });
    const { error: err3 } = createValidDbObj({ ...csvRow, height: "300" });

    expect(err1).toBeTruthy();
    expect(err2).toBeTruthy();
    expect(err3).toBeTruthy();
  });

  it("invalid gender", async () => {
    const { error: err1 } = createValidDbObj({ ...csvRow, gender: "sdf" });
    const { error: err2 } = createValidDbObj({ ...csvRow, gender: "" });

    expect(err1).toBeTruthy();
    expect(err2).toBeTruthy();
  });

  it("invalid sale amount", async () => {
    const { error: err1 } = createValidDbObj({ ...csvRow, saleAmount: "" });
    const { error: err2 } = createValidDbObj({
      ...csvRow,
      saleAmount: "-123123",
    });

    expect(err1).toBeTruthy();
    expect(err2).toBeTruthy();
  });

  it("invalid last purchase date", async () => {
    const { error: err1 } = createValidDbObj({
      ...csvRow,
      lastPurchaseDate: "2022-11-05T13:15:30Z",
    });
    const { error: err2 } = createValidDbObj({
      ...csvRow,
      lastPurchaseDate: "1900-11-05T13:15:30Z",
    });
    const { error: err3 } = createValidDbObj({
      ...csvRow,
      lastPurchaseDate: "202010",
    });

    expect(err1).toBeTruthy();
    expect(err2).toBeTruthy();
    expect(err3).toBeTruthy();
  });
});
