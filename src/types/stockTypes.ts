export type AllowedTickers =
  | "DNMR"
  | "JCI"
  | "BMI"
  | "ANSS"
  | "CWT"
  | "ITRI"
  | "RSG"
  | "ACM"
  | "AWK"
  | "XYL";

  export type StockSector =
  | "Materials"
  | "Industrials"
  | "Technology"
  | "Utilities";
export interface StockInformation{
    ticker:AllowedTickers,
    balance:number,
    sector: StockSector;
    description: string;
  }
  