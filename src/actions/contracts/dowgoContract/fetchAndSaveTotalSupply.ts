import { Dispatch } from "react";
import { AppAction, AppState } from "../../../context/AppContext";
import { fetchTotalSupply } from "../../../calls/contract/dowgoContract/fetchTotalSupply";

export async function fetchAndSaveTotalSupply(
  dispatch: Dispatch<AppAction>,
  state: AppState
) {
  const totalSupply = await fetchTotalSupply(
    state.contractAddresses.dowgoAddress,
    state.provider
  );
  dispatch({
    type: "setTotalSupply",
    value: totalSupply,
  });
}
