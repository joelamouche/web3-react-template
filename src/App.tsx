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
import { DowgoFooter } from "./Footer";
import { fetchAndSaveProvider } from "./actions/metamask/fetchAndSaveProvider";
import { fetchAndSaveAccountAndChainId } from "./actions/metamask/fetchAndSaveAccountAndChainId";
import { fetchAndSaveContractAddresses } from "./actions/api/fetchAndSaveContractAddresses";
import { fetchAndSaveContractInformations } from "./actions/contracts/fetchAndSaveContractInformations";
import WithdrawPage from "./pages/withdraw/WithdrawPage";

function App() {
  const { Header } = Layout;

  const [state, dispatch] = useReducer(appReducer, initialAppState);

  // CONNECT TO METAMASK

  // detect MM at the start of the Dapp
  useEffect(() => {
    console.log("start");
    fetchAndSaveProvider(dispatch);
  }, []);

  // detect chain id and account
  useEffect(() => {
    console.log("change provider");
    if (state.provider) {
      fetchAndSaveAccountAndChainId(dispatch, state);
    }
  }, [state.provider]);

  //After we have the chainId, get addresses
  useEffect(() => {
    console.log("change chainId");
    if (state.chainId) {
      fetchAndSaveContractAddresses(dispatch, state);
    }
  }, [state.chainId]);

  //After we have the addresses, get contract info
  useEffect(() => {
    console.log("change contractAddresses");
    if (state.contractAddresses) {
      fetchAndSaveContractInformations(dispatch, state);
    }
  }, [state.contractAddresses]);

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
          <Content style={{ height: "115vh" }}>
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
              <Route path="/withdraw" element={<WithdrawPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Content>
          <DowgoFooter />
        </AppContext.Provider>
      </Layout>
    </div>
  );
}

export default App;
