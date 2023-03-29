import { Col, Row } from "antd";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { ONE_DOWGO_UNIT, ONE_USDC_UNIT } from "../../constants";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down-icon.svg";

interface MyPortfolioInformationRowProps {
  openPortfolioDetails: boolean;
  toggleDetails: () => void;
}

export function MyPortfolioInformationRow(
  props: MyPortfolioInformationRowProps
) {
  const { openPortfolioDetails, toggleDetails } = props;
  const { state } = useContext(AppContext);

  const tokenPrice = Number(state.price) / Number(ONE_USDC_UNIT);
  const ownedTokens = Number(state.dowgoBalance) / Number(ONE_DOWGO_UNIT);
  const tokenPriceFixedDecimals = tokenPrice.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
  const investedUSD = (
    (Number(state.dowgoBalance) * Number(state.price)) /
    Number(ONE_DOWGO_UNIT) /
    Number(ONE_USDC_UNIT)
  ).toLocaleString(undefined, { maximumFractionDigits: 2 });
  return (
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
              .toLocaleString(undefined, { maximumFractionDigits: 2 })
              .replace(/[.,]00$/, "")}`}</div>
          </div>
          <div className="fund-info-box">
            <div className="fund-info-name">Invested USD</div>
            <div className="fund-info-value">{`$${investedUSD}`}</div>
          </div>
          <div className="arrow-box">
            {openPortfolioDetails ? (
              <div className="arrow-circle-selected" onClick={toggleDetails}>
                <ArrowDown style={{ width: "12px", color: "white" }} />
              </div>
            ) : (
              <div className="arrow-circle" onClick={toggleDetails}>
                <ArrowDown style={{ width: "12px", color: "white" }} />
              </div>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
}
