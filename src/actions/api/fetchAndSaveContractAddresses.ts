import { Dispatch } from "react";
import { fetchMMProvider } from "../../calls/metamask/fetchMMProvider";
import { ethers } from "ethers";
import { AppAction, AppState } from "../../types/types";
import { fetchContractAddresses } from "../../calls/api/fetchContractAddresses";

export async function fetchAndSaveContractAddresses(
  dispatch: Dispatch<AppAction>,
  state: AppState
) {
  let addresses = await fetchContractAddresses(state.chainId);
  // setContractAddresses(addresses);
  dispatch({
    type: "setContractAddresses",
    value: addresses,
  });
}
