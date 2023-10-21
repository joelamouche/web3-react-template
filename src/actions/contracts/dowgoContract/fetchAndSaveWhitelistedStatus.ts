import { Dispatch } from "react";
import { AppAction, AppState } from "../../../context/AppContext";
import { fetchWhitelistedStatus } from "../../../calls/contract/dowgoContract/fetchWhitelistedStatus";

export async function fetchAndSaveWhitelistedStatus(
  dispatch: Dispatch<AppAction>,
  state: AppState
): Promise<boolean> {
  const isWhitelisted = await fetchWhitelistedStatus(
    state.contractAddresses.dowgoAddress,
    state.provider,
    state.currentAccount
  );
  dispatch({
    type: "setWhitelistedStatus",
    value: isWhitelisted,
  });
  return isWhitelisted;
}
