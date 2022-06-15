import React from "react";
import "./App.css";
import ConnectMetaMask from "./components/ConnectMetaMask";
import { Address } from "./types/types";
import { BigNumber, providers } from "ethers";
import DowgoContract from "./components/DowgoView";
import ApproveUSDC from "./components/ApproveUSDC";
import { BalancePanel } from "./components/BalanceView";

function App() {
  const [provider, setProvider] = React.useState<providers.Web3Provider|undefined>(undefined);
  const [currentAccount, setCurrentAccount] = React.useState<Address>("0x");
  const [allowance, setAllowance] = React.useState<BigNumber>(BigNumber.from(0));
  const [dowgoBalance, setDowgoBalance] = React.useState<BigNumber>(BigNumber.from(0));
  const [usdcBalance, setUSDCBalance] = React.useState<BigNumber>(BigNumber.from(0));
  const [displayModal, setDisplayModal] = React.useState<boolean>(false);

  return (
    <div className="App">
      <header>
        {ConnectMetaMask(
          provider,
          setProvider,
          currentAccount,
          setCurrentAccount
        )}
        {BalancePanel(
          dowgoBalance,
          usdcBalance
        )}
        {DowgoContract(
          provider,
          currentAccount,
          allowance,
          usdcBalance,
          setUSDCBalance,
          dowgoBalance, 
          setDowgoBalance,
          setDisplayModal
        )}
        {ApproveUSDC(
          provider,
          currentAccount,
          allowance, setAllowance,
          displayModal, setDisplayModal
        )}
      </header>
    </div>
  );
}

export default App;
