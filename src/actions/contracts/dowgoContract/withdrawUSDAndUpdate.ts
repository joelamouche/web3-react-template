import { AppAction, AppState } from "../../../types/types";

import { withdrawUSD } from "../../../calls/contract/dowgoContract/withdrawUSD";
import { Dispatch } from "react";
import { fetchAndSaveUserUSDBalanceOnDowgo } from "./fetchAndSaveUserUSDBalanceOnDowgo";

export const withdrawUSDAndUpdate = async (
  dispatch: Dispatch<AppAction>,
  state: AppState,
  withdrawAmount: number
): Promise<void> => {
  try {
    await withdrawUSD(
      state.contractAddresses.dowgoAddress,
      state.provider,
      withdrawAmount
    );
    await fetchAndSaveUserUSDBalanceOnDowgo(dispatch, state);
  } catch (error) {
    console.error(error);
  }
};
