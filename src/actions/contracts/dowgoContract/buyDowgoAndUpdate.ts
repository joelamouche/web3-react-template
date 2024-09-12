import { AppAction, AppState } from "../../../context/AppContext";

import { Dispatch } from "react";
import { fetchAndSaveUserUSDBalanceOnDowgo } from "./fetchAndSaveUserUSDBalanceOnDowgo";
import { buyDowgo } from "../../../calls/contract/dowgoContract/buyDowgo";
import { fetchAndSaveContractInformations } from "../fetchAndSaveContractInformations";
import { NotificationInstance } from "antd/lib/notification";

export const buyDowgoAndUpdate = async (
  dispatch: Dispatch<AppAction>,
  state: AppState,
  buyAmount: number,
  notificationApi: NotificationInstance
): Promise<void> => {
  try {
    await buyDowgo(
      state.contractAddresses.dowgoAddress,
      state.provider,
      buyAmount,
      notificationApi
    );
    await fetchAndSaveContractInformations(dispatch, state);
  } catch (error) {
    console.error(error);
  }
};
