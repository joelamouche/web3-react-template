import React, { useEffect, useReducer } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import { Layout, notification, Space } from "antd";

import DowgoLogo from "./assets/icons/dowgo-logo.png";

import "./App.css";
import { appReducer } from "./reducers/appReducer";
import AppContext, { initialAppState } from "./context/AppContext";
import DowgoMenu from "./components/Menu/DowgoMenu";
import { Content } from "antd/lib/layout/layout";
import { DowgoFooter } from "./Footer";
import { fetchAndSaveProvider } from "./actions/metamask/fetchAndSaveProvider";
import { fetchAndSaveAccountAndChainId } from "./actions/metamask/fetchAndSaveAccountAndChainId";
import { fetchAndSaveContractAddresses } from "./actions/api/fetchAndSaveContractAddresses";
import { fetchAndSaveContractInformations } from "./actions/contracts/fetchAndSaveContractInformations";
import WithdrawPage from "./pages/withdraw/WithdrawPage";
import FundsPage from "./pages/funds/FundsPage";
import Invest from "./pages/home/home";
import { fetchAndSaveStockPortfolio } from "./actions/api/fetchAndSaveStockPortfolio";
import MyPortfolioPage from "./pages/my-portfolio/MyPortfolioPage";
import { ALLOWED_NETWORKS } from "./constants";
import { ChainId } from "./types/types";

function App() {
  const { Header } = Layout;

  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const [api, contextHolder] = notification.useNotification();

  // CONNECT TO METAMASK

  // detect MM at the start of the Dapp
  useEffect(() => {
    fetchAndSaveProvider(dispatch);
  }, []);

  // detect chain id and account
  useEffect(() => {
    if (state.provider) {
      fetchAndSaveAccountAndChainId(dispatch, state);
    }
  }, [state.provider]);

  //After we have the chainId, get addresses, only if we are on an authorized network
  useEffect(() => {
    if (state.chainId && ALLOWED_NETWORKS.includes(ChainId[state.chainId])) {
      fetchAndSaveContractAddresses(dispatch, state);
    }
  }, [state.chainId]);

  // If account changed, we need to refetch contract information
  useEffect(() => {
    if (state.chainId && state.currentAccount) {
      fetchAndSaveContractInformations(dispatch, state);
    }
  }, [state.currentAccount]);

  //After we have the addresses, get contract info
  useEffect(() => {
    if (state.contractAddresses) {
      fetchAndSaveContractInformations(dispatch, state);
    }
  }, [state.contractAddresses]);

  // Finally, get stock portfolio info
  useEffect(() => {
    if (state.allowance && state.stockPortfolio == undefined) {
      fetchAndSaveStockPortfolio(dispatch);
    }
  }, [state.allowance]);

  return (
    <div>
      <Layout>
        <AppContext.Provider value={{ state, dispatch, notificationApi: api }}>
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
          <Content style={{ minHeight: "115vh" }}>
            {/* For tx toast notifications */}
            {contextHolder}
            <Routes>
              <Route path="/" element={<Invest />} />
              <Route path="/invest" element={<Invest />} />
              <Route path="/invest/:buyOrSell" element={<Invest />} />
              <Route path="/dowgo-funds" element={<FundsPage />} />
              <Route path="/my-portfolio" element={<MyPortfolioPage />} />
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
