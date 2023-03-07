import { AppAction, AppState } from "../../../types/types";

import { Dispatch } from "react";
import { approveUSD } from "../../../calls/contract/usdtContract/approveUSD";
import { fetchAndSaveUserAllowance } from "./fetchAndSaveUserAllowance";

export const approveUSDAndUpdate = async (
  dispatch: Dispatch<AppAction>,
  state: AppState
): Promise<void> => {
  try {
    await approveUSD(
      state.contractAddresses.usdAddress,
      state.contractAddresses.dowgoAddress,
      state.provider
    );
    await fetchAndSaveUserAllowance(dispatch, state);
  } catch (error) {
    console.error(error);
  }
};
