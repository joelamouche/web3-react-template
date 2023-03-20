import { Dispatch } from "react";
import { AppAction, AppState } from "../../context/AppContext";
import { fetchAndSaveChainId } from "./fetchAndSaveChainId";
import { fetchAndSaveAccount } from "./fetchAndSaveAccount";

export async function fetchAndSaveAccountAndChainId(
  dispatch: Dispatch<AppAction>,
  state: AppState
) {
  await fetchAndSaveAccount(dispatch);
  await fetchAndSaveChainId(dispatch, state.chainId);
}
