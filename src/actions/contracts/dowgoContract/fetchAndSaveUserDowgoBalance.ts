import { Dispatch } from "react";
import { AppAction, AppState } from "../../../types/types";
import { fetchUserDowgoBalance } from "../../../calls/contract/dowgoContract/fetchUserDowgoBalance";

export async function fetchAndSaveUserDowgoBalance(
  dispatch: Dispatch<AppAction>,
  state: AppState
) {
  const balance = await fetchUserDowgoBalance(
    state.contractAddresses.dowgoAddress,
    state.provider,
    state.currentAccount
  );
  dispatch({
    type: "setUserDowgoBalance",
    value: balance,
  });
}
