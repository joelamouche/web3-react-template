import axios from "axios";
import { StockInformation } from "../../types/stockTypes";

export const fetchStockPortfolio = async (): Promise<StockInformation[]> => {
  try {
    const resp = (
      await axios.get(
        "https://211thuucd8.execute-api.eu-west-3.amazonaws.com/portfolioInfo"
      )
    ).data;
    return resp as StockInformation[];
  } catch (error) {
    console.error(error);
  }
};
