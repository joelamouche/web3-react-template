import { Dispatch } from "react";
import { AppAction, AppState } from "../../../types/types";
import { fetchUserAllowance } from "../../../calls/contract/usdtContract/fetchUserAllowance";

export async function fetchAndSaveUserAllowance(
  dispatch: Dispatch<AppAction>,
  state: AppState
) {
  const allowance = await fetchUserAllowance(
    state.contractAddresses.usdAddress,
    state.contractAddresses.dowgoAddress,
    state.provider,
    state.currentAccount
  );
  dispatch({
    type: "setUserAllowance",
    value: allowance,
  });
}
