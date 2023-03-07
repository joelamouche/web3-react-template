import { AppAction, AppState } from "../../../context/AppContext";

import { withdrawUSD } from "../../../calls/contract/dowgoContract/withdrawUSD";
import { Dispatch } from "react";
import { fetchAndSaveUserUSDBalanceOnDowgo } from "./fetchAndSaveUserUSDBalanceOnDowgo";
import { NotificationInstance } from "antd/lib/notification";

export const withdrawUSDAndUpdate = async (
  dispatch: Dispatch<AppAction>,
  state: AppState,
  withdrawAmount: number,
  notificationApi: NotificationInstance
): Promise<void> => {
  try {
    await withdrawUSD(
      state.contractAddresses.dowgoAddress,
      state.provider,
      withdrawAmount,
      notificationApi
    );
    await fetchAndSaveUserUSDBalanceOnDowgo(dispatch, state);
  } catch (error) {
    console.error(error);
  }
};
