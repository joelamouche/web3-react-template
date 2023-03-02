import { createContext } from "react";
import { AppAction, AppState, EthAddress } from "../types/types";
import { BigNumber } from "ethers";

export const initialAppState = {
  // MM
  currentAccount: "0x" as EthAddress,
  provider: undefined,
  chainId: undefined,

  // USDT
  allowance: BigNumber.from(0),
  usdBalance: BigNumber.from(0),

  // Dowgo
  dowgoBalance: BigNumber.from(0),
  usdBalanceOnDowgo: BigNumber.from(0),
  price: BigNumber.from(0),
  contractAddresses: undefined,
  targetRatio: BigNumber.from(0),
  collRange: BigNumber.from(0),
  totalSupply: BigNumber.from(0),
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialAppState,
  dispatch: () => null,
});

export default AppContext;
