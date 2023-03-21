import { Col, Row } from "antd";
import "./index.styles.scss";

import { ReactComponent as ClockIcon } from "../../assets/icons/clock-icon.svg";
import { lightGrey } from "../../styles/colors";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { ONE_DOWGO_UNIT, ONE_USDC_UNIT } from "../../constants";
import CopyButton from "../displayComponents/CopyButton";

function MyPortfolioView() {
  const { state } = useContext(AppContext);
  const tokenPrice = Number(state.price) / Number(ONE_USDC_UNIT);
  const ownedTokens = Number(state.dowgoBalance) / Number(ONE_DOWGO_UNIT);
  const tokenPriceFixedDecimals = tokenPrice.toFixed(2);
  const investedUSD = (
    (Number(state.dowgoBalance) * Number(state.price)) /
    Number(ONE_DOWGO_UNIT) /
    Number(ONE_USDC_UNIT)
  ).toFixed(2);
  return (
    <div className="my-portfolio-container">
      <div className="my-portfolio-overview-container">
        <div className="my-portfolio-overview-title">My Portfolio</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CopyButton text={state.currentAccount} />
          <span className="portfolio-address">{state.currentAccount}</span>
        </div>
        <div className="total-portfolio-amount">{`$${investedUSD}`}</div>
      </div>
      <div className="my-deposit-title">Dowgo Funds</div>
      <div className="fund-container">
        <Row>
          <Col span={6}>
            <div className="fund-name">DOWGO ONE</div>
            <div className="fund-subtitle">
              <span className="fund-tag">DWG1</span>
              <span className="fund-more-details">More Details</span>
              {/* TODO: add link to details */}
            </div>
          </Col>
          <Col span={18}>
            <div className="fund-row-right">
              <div>
                <div className="fund-info-name">TokenPrice</div>
                <div className="fund-info-value">{`$${tokenPriceFixedDecimals}`}</div>
              </div>
              {/*
            TODO: add performance and pNL when we have a longer history on the Fund
            */}
              <div className="fund-info-box">
                <div className="fund-info-name">Nb of Tokens</div>
                <div className="fund-info-value">{`${ownedTokens
                  .toFixed(2)
                  .replace(/[.,]00$/, "")}`}</div>
              </div>
              <div className="fund-info-box">
                <div className="fund-info-name">Invested USD</div>
                <div className="fund-info-value">{`$${investedUSD}`}</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* TODO: add this when we have more funds
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="discover-funds-text">Discover More funds</div>
      </div> */}
    </div>
  );
}

export default MyPortfolioView;
