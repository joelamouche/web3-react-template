import { Col, Row } from "antd";
import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { ONE_DOWGO_UNIT, ONE_USDC_UNIT } from "../../constants";
import CopyButton from "../displayComponents/CopyButton";
import { MyPortfolioDetails } from "./MyPortfolioDetails";
import { MyPortfolioInformationRow } from "./MyPortfolioInformationRow";
import "./index.styles.scss";

function MyPortfolioView() {
  const { state } = useContext(AppContext);
  const [openPortfolioDetails, setPortfolioDetails] = useState<boolean>(false);

  const investedUSD = (
    (Number(state.dowgoBalance) * Number(state.price)) /
    Number(ONE_DOWGO_UNIT) /
    Number(ONE_USDC_UNIT)
  ).toLocaleString(undefined, { maximumFractionDigits: 2 });

  function toggleDetails() {
    setPortfolioDetails(!openPortfolioDetails);
  }
  return (
    <div className="my-portfolio-container">
      <div className="my-portfolio-overview-container">
        <div className="my-portfolio-overview-title">My Portfolio</div>
        <div className="my-portfolio-current-address">
          <CopyButton text={state.currentAccount} />
          <span className="portfolio-address">{state.currentAccount}</span>
        </div>
        <div className="total-portfolio-amount">{`$${investedUSD}`}</div>
      </div>
      <div className="my-deposit-title">Dowgo Funds</div>
      <div className="fund-container">
        <MyPortfolioInformationRow
          openPortfolioDetails={openPortfolioDetails}
          toggleDetails={toggleDetails}
        />
        <MyPortfolioDetails openPortfolioDetails={openPortfolioDetails} />
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
