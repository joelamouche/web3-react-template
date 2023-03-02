import { Dispatch } from "react";
import { AppAction, AppState } from "../../../types/types";
import { fetchUserUSDTBalance } from "../../../calls/contract/usdtContract/fetchUserUSDTBalance";

export async function fetchAndSaveUserUSDTBalance(
  dispatch: Dispatch<AppAction>,
  state: AppState
) {
  const balance = await fetchUserUSDTBalance(
    state.contractAddresses.usdAddress,
    state.provider,
    state.currentAccount
  );
  dispatch({
    type: "setUserUSDTBalance",
    value: balance,
  });
}
