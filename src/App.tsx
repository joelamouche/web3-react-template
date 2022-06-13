import React from "react";
import "./App.css";
import ConnectMetaMask from "./components/ConnectMetaMask";
import USDCBalance from "./components/USDCBalance";
import { Address } from "./types/types";
import { BigNumber, providers } from "ethers";
import DowgoContract from "./components/DowgoContract";
import ApproveUSDC from "./components/ApproveUSDC";

function App() {
  const [provider, setProvider] = React.useState<providers.Web3Provider|undefined>(undefined);
  const [currentAccount, setCurrentAccount] = React.useState<Address>("0x");
  const [allowance, setAllowance] = React.useState<BigNumber>(BigNumber.from(0));

  return (
    <div className="App">
      <header className="App-header">
        {ConnectMetaMask(
          provider,
          setProvider,
          currentAccount,
          setCurrentAccount
        )}
        {USDCBalance(
          provider,
          currentAccount
        )}
        {DowgoContract(
          provider,
          currentAccount,
          allowance
        )}
        {ApproveUSDC(
          provider,
          currentAccount,
          allowance, setAllowance
        )}
      </header>
    </div>
  );
}

export default App;
