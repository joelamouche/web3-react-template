import { Dispatch } from "react";
import { AppAction, AppState } from "../../../types/types";
import { fetchUserUSDBalanceOnDowgo } from "../../../calls/contract/dowgoContract/fetchUserUSDBalanceOnDowgo";

export async function fetchAndSaveUserUSDBalanceOnDowgo(
  dispatch: Dispatch<AppAction>,
  state: AppState
) {
  const balance = await fetchUserUSDBalanceOnDowgo(
    state.contractAddresses.dowgoAddress,
    state.provider,
    state.currentAccount
  );
  dispatch({
    type: "setUserUSDBalanceOnDowgo",
    value: balance,
  });
}
