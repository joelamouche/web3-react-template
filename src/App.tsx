import React, { useEffect, useReducer } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import DowgoDApp from "./pages/home/home";
import Funds from "./pages/funds/funds";
import ConnectMetaMask from "./components/Menu/ConnectMetaMask";
import Invest from "./pages/invest/Invest";

import { Layout } from "antd";
import { EthAddress, ChainId } from "./types/types";
import { providers } from "ethers";

//@ts-ignore
import DowgoLogo from "./assets/header/dowgo-logo.png";

import "./App.css";
import { appReducer } from "./reducers/appReducer";
import AppContext, { initialAppState } from "./context/AppContext";
import DowgoMenu from "./components/Menu/DowgoMenu";

function App() {
  const { Header } = Layout;

  const [state, dispatch] = useReducer(appReducer, initialAppState);

  return (
    <div>
      <Layout>
        <AppContext.Provider value={{ state, dispatch }}>
          <Header className="app-header">
            {<DowgoMenu />}
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
            {/* {state.currentAccount !== "0x" ? (
              <Route path="/" element={<Navigate to="/profile" />} />
            ) : (
              <Route path="/" element={<DowgoDApp />} />
            )} */}
            <Route path="/" element={<DowgoDApp />} />
            <Route path="/invest" element={Invest()} />
            <Route path="/dowgo-funds" element={<Funds />} />
            <Route path="/my-portfolio" element={<Funds />} />
            <Route path="/withdraw" element={<Funds />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppContext.Provider>
      </Layout>
    </div>
  );
}

export default App;
