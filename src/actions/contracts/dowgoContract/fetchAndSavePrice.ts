import { Dispatch } from "react";
import { AppAction, AppState } from "../../../context/AppContext";
import { fetchPrice } from "../../../calls/contract/dowgoContract/fetchPrice";

export async function fetchAndSavePrice(
  dispatch: Dispatch<AppAction>,
  state: AppState
) {
  const price = await fetchPrice(
    state.contractAddresses.dowgoAddress,
    state.provider
  );
  dispatch({
    type: "setPrice",
    value: price,
  });
}
