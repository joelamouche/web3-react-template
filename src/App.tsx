import React from "react";
import "./App.css";
import ConnectMetaMask from "./components/ConnectMetaMask";
import { EthAddress, ChainId } from "./types/types";
import { BigNumber, providers } from "ethers";
import DowgoContract from "./components/DowgoView";
import ApproveUSDC from "./components/ApproveUSDC";
import { BalancePanel } from "./components/BalanceView";

export function DowgoDApp() {
  const [provider, setProvider] = React.useState<
    providers.Web3Provider | undefined
  >(undefined);
  const [chainId, setChainId] = React.useState<ChainId | undefined>(undefined);
  const [currentAccount, setCurrentAccount] = React.useState<EthAddress>("0x");
  const [allowance, setAllowance] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [dowgoBalance, setDowgoBalance] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [usdcBalance, setUSDCBalance] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [displayModal, setDisplayModal] = React.useState<boolean>(false);

  return (
    <div className="App">
      <header>
        {ConnectMetaMask(
          provider,
          setProvider,
          currentAccount,
          setCurrentAccount,
          chainId,
          setChainId
        )}
        {BalancePanel(dowgoBalance, usdcBalance)}
        {DowgoContract(
          provider,
          currentAccount,
          allowance,
          usdcBalance,
          setUSDCBalance,
          dowgoBalance,
          setDowgoBalance,
          setDisplayModal,
          chainId
        )}
        {ApproveUSDC(
          provider,
          chainId,
          currentAccount,
          allowance,
          setAllowance,
          displayModal,
          setDisplayModal
        )}
      </header>
    </div>
  );
}

export default DowgoDApp;
