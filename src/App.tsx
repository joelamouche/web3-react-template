import React from "react";
import "./App.css";
import ConnectMetaMask from "./components/ConnectMetaMask";
import USDCBalance from "./components/USDCBalance";
import { Address } from "./types/types";
import { providers } from "ethers";
import DowgoContract from "./components/DowgoContract";
import ApproveUSDC from "./components/ApproveUSDC";

function App() {
  const [provider, setProvider] = React.useState<providers.Web3Provider|undefined>(undefined);
  const [currentAccount, setCurrentAccount] = React.useState<Address>("0x");

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
          currentAccount
        )}
        {ApproveUSDC(
          provider,
          currentAccount
        )}
      </header>
    </div>
  );
}

export default App;
