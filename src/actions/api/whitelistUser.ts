import { Dispatch } from "react";
import { AppAction, AppState } from "../../context/AppContext";
import { fetchStockPortfolio } from "../../calls/api/fetchStockPortfolio";
import { whitelistUser } from "../../calls/api/whitelistUser";
import { fetchAndSaveWhitelistedStatus } from "../contracts/dowgoContract/fetchAndSaveWhitelistedStatus";

export async function whitelistUserAndRefresh(
  dispatch: Dispatch<AppAction>,
  state: AppState
) {
  let resp = await whitelistUser(state.currentAccount);

  await new Promise((res) => setTimeout(res, 60000));

  await fetchAndSaveWhitelistedStatus(dispatch, state);
}
