import React, { useReducer } from "react";
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
import { appReducer } from "./reducers/appReducer";
import AppContext, { initialAppState } from "./context/appContext";

function App() {
  const { Header } = Layout;
  // const [currentAccount, setCurrentAccount] = React.useState<EthAddress>("0x");
  // const [provider, setProvider] = React.useState<
  //   providers.Web3Provider | undefined
  // >(undefined);
  // const [chainId, setChainId] = React.useState<ChainId | undefined>(undefined);

  const [state, dispatch] = useReducer(appReducer, initialAppState);

  return (
    <div>
      <Layout>
        <AppContext.Provider value={{ state: state, dispatch }}>
          <Header className="app-header">
            {ConnectMetaMask()
            // provider,
            // setProvider,
            // currentAccount,
            // setCurrentAccount,
            // chainId,
            // setChainId
            }
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
            {state.currentAccount !== "0x" ? (
              <Route path="/" element={<Navigate to="/profile" />} />
            ) : (
              <Route path="/" element={<DowgoDApp />} />
            )}
            <Route
              path="/profile"
              element={Profile(
                state.provider,
                state.chainId,
                state.currentAccount
              )}
            />
            <Route path="/dowgo-funds" element={<Funds />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppContext.Provider>
      </Layout>
    </div>
  );
}

export default App;
