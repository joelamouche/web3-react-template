import React, { useEffect, useReducer } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import DowgoDApp from "./pages/home/home";
import Funds from "./pages/funds/funds";
import ConnectMetaMask from "./components/Menu/ConnectMetaMask";
import OldInvest from "./pages/invest/Invest";

import { Layout } from "antd";
import { EthAddress, ChainId } from "./types/types";
import { providers } from "ethers";

import DowgoLogo from "./assets/icons/dowgo-logo.png";

import "./App.css";
import { appReducer } from "./reducers/appReducer";
import AppContext, { initialAppState } from "./context/AppContext";
import DowgoMenu from "./components/Menu/DowgoMenu";
import Invest from "./pages/home/homeWIP";
import { Content, Footer } from "antd/lib/layout/layout";

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
          <Content style={{ height: "110vh" }}>
            <Routes>
              {/* {state.currentAccount !== "0x" ? (
              <Route path="/" element={<Navigate to="/profile" />} />
            ) : (
              <Route path="/" element={<DowgoDApp />} />
            )} */}
              <Route path="/" element={<Invest />} />
              <Route path="/invest" element={OldInvest()} />
              <Route path="/dowgo-funds" element={<Funds />} />
              <Route path="/my-portfolio" element={<Funds />} />
              <Route path="/withdraw" element={<Funds />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Content>
          <Footer>Help</Footer>
        </AppContext.Provider>
      </Layout>
    </div>
  );
}

export default App;
