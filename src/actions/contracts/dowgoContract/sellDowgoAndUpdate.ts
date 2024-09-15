import { AppAction, AppState } from "../../../context/AppContext";

import { Dispatch } from "react";
import { fetchAndSaveUserUSDBalanceOnDowgo } from "./fetchAndSaveUserUSDBalanceOnDowgo";
import { buyDowgo } from "../../../calls/contract/dowgoContract/buyDowgo";
import { fetchAndSaveContractInformations } from "../fetchAndSaveContractInformations";
import { sellDowgo } from "../../../calls/contract/dowgoContract/sellDowgo";
import { NotificationInstance } from "antd/lib/notification";

export const sellDowgoAndUpdate = async (
  dispatch: Dispatch<AppAction>,
  state: AppState,
  sellAmount: number,
  notificationApi: NotificationInstance
): Promise<void> => {
  try {
    await sellDowgo(
      state.contractAddresses.dowgoAddress,
      state.provider,
      sellAmount,
      notificationApi
    );
    await fetchAndSaveContractInformations(dispatch, state);
  } catch (error) {
    console.error(error);
  }
};
