import { Dispatch } from "react";
import { AppAction, AppState } from "../../types/types";
import { fetchContractAddresses } from "../../calls/api/fetchContractAddresses";

export async function fetchAndSaveContractAddresses(
  dispatch: Dispatch<AppAction>,
  state: AppState
) {
  let addresses = await fetchContractAddresses(state.chainId);
  
  dispatch({
    type: "setContractAddresses",
    value: addresses,
  });
}
