import React from "react";
import { Button } from "antd";
import HomeFund from "../../components/home-fund/home-fund.component";

import "./funds.styles.scss";

const Funds = () => {
  return (
    <div className="funds-page-container">
      <div className="funds-container">
        <div className="app-fund-left-container">
          <HomeFund />
        </div>
        <div className="app-fund-right-container">
          <div className="buy-sell-container-alpha">
            <Button className="buy-button-alpha">BUY</Button>
            <Button className="sell-button-alpha">SELL</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funds;
