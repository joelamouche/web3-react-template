import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import DowgoDApp from "./pages/home/home";
import Funds from "./pages/funds/funds";
import ConnectMetaMask from "./components/ConnectMetaMask/ConnectMetaMask";
import Profile from "./pages/profile/profile";

import { Layout } from "antd";
import { EthAddress, ChainId } from "./types/types";
import { providers } from "ethers";

//@ts-ignore
import DowgoLogo from "./assets/header/dowgo-logo.png";

import "./App.css";

function App() {
  const { Header } = Layout;
  const [currentAccount, setCurrentAccount] = React.useState<EthAddress>("0x");
  const [provider, setProvider] = React.useState<
    providers.Web3Provider | undefined
  >(undefined);
  const [chainId, setChainId] = React.useState<ChainId | undefined>(undefined);

  return (
    <div>
      <Layout>
        <Header className="app-header">
          {ConnectMetaMask(
            provider,
            setProvider,
            currentAccount,
            setCurrentAccount,
            chainId,
            setChainId
          )}
          <div className="dowgo-logo-container">
            <Link to="/">
              <img
                src={DowgoLogo}
                alt="dowgo-logo"
                className="dowgo-logo-menu"
              />
            </Link>
          </div>
        </Header>

        <Routes>
          {currentAccount !== "0x" ? (
            <Route path="/" element={<Navigate to="/profile" />} />
          ) : (
            <Route path="/" element={<DowgoDApp />} />
          )}
          <Route
            path="/profile"
            element={Profile(provider, chainId, currentAccount)}
          />
          <Route path="/dowgo-funds" element={<Funds />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
