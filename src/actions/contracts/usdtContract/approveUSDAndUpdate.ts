import { AppAction, AppState } from "../../../context/AppContext";

import { Dispatch } from "react";
import { approveUSD } from "../../../calls/contract/usdtContract/approveUSD";
import { fetchAndSaveUserAllowance } from "./fetchAndSaveUserAllowance";
import { NotificationInstance } from "antd/lib/notification";

export const approveUSDAndUpdate = async (
  dispatch: Dispatch<AppAction>,
  state: AppState,
  notificationApi: NotificationInstance
): Promise<void> => {
  try {
    await approveUSD(
      state.contractAddresses.usdAddress,
      state.contractAddresses.dowgoAddress,
      state.provider,
      notificationApi
    );
    await fetchAndSaveUserAllowance(dispatch, state);
  } catch (error) {
    console.error(error);
  }
};
