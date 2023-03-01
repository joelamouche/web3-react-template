import { createContext } from "react";
import { AppAction, AppState, EthAddress } from "../types/types";
import { BigNumber } from "ethers";

export const initialAppState = {
  currentAccount: "0x" as EthAddress,
  provider: undefined,
  chainId: undefined,

  allowance: BigNumber.from(0),
  usdcBalance: BigNumber.from(0),
  dowgoBalance: BigNumber.from(0),
  price: BigNumber.from(0),
  contractAddresses: undefined,
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialAppState,
  dispatch: () => null,
});

export default AppContext;
