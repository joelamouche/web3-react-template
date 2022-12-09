import React from "react";
import { Layout, Button } from 'antd';
import ConnectMetaMask from "./components/ConnectMetaMask/ConnectMetaMask";
import { EthAddress, ChainId } from "./types/types";
import { BigNumber, providers } from "ethers";
import DowgoContract from "./components/DowgoView";
import ApproveUSDC from "./components/ApproveUSDC";
import { BalancePanel } from "./components/BalanceView";
import HomeMetrics from "./components/home-metrics/home-metrics.component";
import HomeFund from "./components/home-fund/home-fund.component";

//@ts-ignore
import VideoBanner from './assets/video-banner/video-banner.mp4';
import DowgoLogo from './assets/header/dowgo-logo.png';

import "./App.css";

export function DowgoDApp() {
  const { Header, Footer, Content } = Layout;
  
  const [provider, setProvider] = React.useState<
    providers.Web3Provider | undefined
  >(undefined);
  const [chainId, setChainId] = React.useState<ChainId | undefined>(undefined);
  const [currentAccount, setCurrentAccount] = React.useState<EthAddress>("0x");
  const [allowance, setAllowance] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [dowgoBalance, setDowgoBalance] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [usdcBalance, setUSDCBalance] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [price, setPrice] = React.useState<BigNumber>(BigNumber.from(0));
  const [displayModal, setDisplayModal] = React.useState<boolean>(false);


  return (
    <div className="app-container">
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
            <img src={DowgoLogo} alt="dowgo-logo" className="dowgo-logo-menu"/>
          </div>
        </Header>
        <video
          width="100%"
          height="auto"
          autoPlay
          loop
          className="app-video-banner"
        >
          <source src={VideoBanner} type="video/mp4" />
        </video>

        <Content className="app-banner-container">
          <h1 className="app-banner-text"> DOWGO DECENTRALIZED EQUITY FUND </h1>
        </Content>

        <Content className="app-metrics-container">
          <HomeMetrics />
        </Content>

        <Content className="app-fund-container">
          <div className="app-fund-left-container">
            <HomeFund />
          </div>
          <div className="app-fund-right-container">
            <div className="buy-sell-container-alpha">
              <Button  className="buy-button-alpha">
                BUY
              </Button>
              <Button   className="sell-button-alpha">
                SELL
              </Button>
            </div>
          </div>
        </Content>
        <Content className="app-buy-sell-container">
          <div className="app-balance-container">
            {BalancePanel(dowgoBalance, usdcBalance, price)}
          </div>

        </Content>
        <Content className="">
          {DowgoContract(
            provider,
            currentAccount,
            allowance,
            usdcBalance,
            setUSDCBalance,
            dowgoBalance,
            setDowgoBalance,
            setDisplayModal,
            chainId,
            price,
            setPrice
          )}
        </Content>
        <br />
        <Content className="">
          {ApproveUSDC(
            provider,
            chainId,
            currentAccount,
            allowance,
            setAllowance,
            displayModal,
            setDisplayModal
          )}
        </Content>
        <Footer className=""></Footer>
      </Layout>
    </div>
  );
}

export default DowgoDApp;
