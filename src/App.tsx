import React, { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import { Layout, notification, Space } from "antd";

import { setScrollY } from '../src/redux/reducers/menuBackground';

import DowgoLogo from "./assets/icons/dowgo-logo.png";

import { appReducer } from "./reducers/appReducer";
import AppContext, { initialAppState } from "./context/AppContext";
import DowgoMenu from "./components/Menu/DowgoMenu/DowgoMenu";
import DowgoMenuMobile from "./components/Menu/DowgoMenuMobile/DowgoMenuMobile";
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

//redux 
import { updateDeviceType } from './redux/reducers/deviceMenu';
import { selectIsMobile } from './redux/selectors/selectors';
import { RootState } from './redux/store';
import { useMediaQuery } from 'react-responsive';
import "./App.scss";

function App() {
  const { Header } = Layout;

  const [state, dispatch] = useReducer(appReducer, initialAppState);
  notification.config({ maxCount: 1 });
  const [api, contextHolder] = notification.useNotification();

  const dispatchMenu = useDispatch();
  const isMobileDevice = useMediaQuery({ maxWidth: 480 });

  const dispatchScroll = useDispatch();
  const stateScroll = useSelector((stateScroll: RootState) => stateScroll.menu.scrollY);

  // Update the device type in the Redux store
  useEffect(() => {
    dispatchMenu(updateDeviceType(isMobileDevice ? 'mobile' : 'laptop'));
  }, [dispatchMenu, isMobileDevice]);

  const isMobile = useSelector(selectIsMobile); // Use the selector

  // animation for menu background-color on scroll
  useEffect(() => {
    const handleScroll = () => {
      dispatchScroll(setScrollY(window.scrollY));
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatchScroll]);


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

          <Header className={`app-header menu ${stateScroll > 10 ? 'scrolled' : ''}`}>
          
          {
          isMobile ? 
            <DowgoMenuMobile /> 
              : 
            <DowgoMenu />
          }

            <div className="dowgo-logo-container">
              <a href="https://www.dowgo.com">
                <img
                  src={DowgoLogo}
                  alt="dowgo-logo"
                  className="dowgo-logo-menu"
                />
              </a>
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
