import { Dispatch } from "react";
import { AppAction, AppState } from "../../context/AppContext";
import { fetchStockPortfolio } from "../../calls/api/fetchStockPortfolio";

export async function fetchAndSaveStockPortfolio(
  dispatch: Dispatch<AppAction>
) {
  let stockInfos = await fetchStockPortfolio();

  dispatch({
    type: "setStockPortfolio",
    value: stockInfos,
  });
}
