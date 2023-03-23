import { Dispatch } from "react";
import { AppAction, AppState } from "../../../context/AppContext";
import { fetchTargetRatio } from "../../../calls/contract/dowgoContract/fetchTargetRatio";

export async function fetchAndSaveCollRange(
  dispatch: Dispatch<AppAction>,
  state: AppState
) {
  if (state.contractAddresses){
    const collRange = await fetchTargetRatio(
      state.contractAddresses.dowgoAddress,
      state.provider
    );
    dispatch({
      type: "setCollRange",
      value: collRange,
    });
  }
}
