import { Dispatch } from "react";
import { fetchAndSaveCollRange } from "./dowgoContract/fetchAndSaveCollRange";
import { fetchAndSaveTargetRatio } from "./dowgoContract/fetchAndSaveTargetRatio";
import { fetchAndSavePrice } from "./dowgoContract/fetchAndSavePrice";
import { fetchAndSaveTotalSupply } from "./dowgoContract/fetchAndSaveTotalSupply";
import { fetchAndSaveUserDowgoBalance } from "./dowgoContract/fetchAndSaveUserDowgoBalance";
import { fetchAndSaveUserUSDBalanceOnDowgo } from "./dowgoContract/fetchAndSaveUserUSDBalanceOnDowgo";
import { fetchAndSaveUserUSDTBalance } from "./usdtContract/fetchAndSaveUserUSDTBalance";
import { fetchAndSaveUserAllowance } from "./usdtContract/fetchAndSaveUserAllowance";
import { AppAction, AppState } from "../../context/AppContext";

export async function fetchAndSaveContractInformations(
  dispatch: Dispatch<AppAction>,
  state: AppState
) {
  // Update these informations just once, when the website is loaded
  Number(state.collRange) === 0 &&
    (await fetchAndSaveCollRange(dispatch, state));
  Number(state.targetRatio) === 0 &&
    (await fetchAndSaveTargetRatio(dispatch, state));
  Number(state.price) === 0 && (await fetchAndSavePrice(dispatch, state));

  // These informations need to be updated on every transaction
  // Dowgo
  await fetchAndSaveUserDowgoBalance(dispatch, state);
  await fetchAndSaveUserUSDBalanceOnDowgo(dispatch, state);
  await fetchAndSaveTotalSupply(dispatch, state);
  // USDT
  await fetchAndSaveUserUSDTBalance(dispatch, state);
  await fetchAndSaveUserAllowance(dispatch, state);
}