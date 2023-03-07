import { AppAction, AppState } from "../../../types/types";

import { Dispatch } from "react";
import { fetchAndSaveUserUSDBalanceOnDowgo } from "./fetchAndSaveUserUSDBalanceOnDowgo";
import { buyDowgo } from "../../../calls/contract/dowgoContract/buyDowgo";
import { fetchAndSaveContractInformations } from "../fetchAndSaveContractInformations";

export const buyDowgoAndUpdate = async (
  dispatch: Dispatch<AppAction>,
  state: AppState,
  buyAmount: number
): Promise<void> => {
  try {
    await buyDowgo(
      state.contractAddresses.dowgoAddress,
      state.provider,
      buyAmount
    );
    await fetchAndSaveContractInformations(dispatch, state);
  } catch (error) {
    console.error(error);
  }
};
