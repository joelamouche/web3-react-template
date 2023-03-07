import { AppAction, AppState } from "../../../types/types";

import { Dispatch } from "react";
import { fetchAndSaveUserUSDBalanceOnDowgo } from "./fetchAndSaveUserUSDBalanceOnDowgo";
import { buyDowgo } from "../../../calls/contract/dowgoContract/buyDowgo";
import { fetchAndSaveContractInformations } from "../fetchAndSaveContractInformations";
import { sellDowgo } from "../../../calls/contract/dowgoContract/sellDowgo";

export const sellDowgoAndUpdate = async (
  dispatch: Dispatch<AppAction>,
  state: AppState,
  sellAmount: number
): Promise<void> => {
  try {
    await sellDowgo(
      state.contractAddresses.dowgoAddress,
      state.provider,
      sellAmount
    );
    await fetchAndSaveContractInformations(dispatch, state);
  } catch (error) {
    console.error(error);
  }
};
