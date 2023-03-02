import { Dispatch } from "react";
import { AppAction, AppState } from "../../../types/types";
import { fetchTargetRatio } from "../../../calls/contract/dowgoContract/fetchTargetRatio";

export async function fetchAndSaveTargetRatio(
  dispatch: Dispatch<AppAction>,
  state: AppState
) {
  const targetRatio = await fetchTargetRatio(
    state.contractAddresses.dowgoAddress,
    state.provider
  );
  dispatch({
    type: "setTargetRatio",
    value: targetRatio,
  });
}
