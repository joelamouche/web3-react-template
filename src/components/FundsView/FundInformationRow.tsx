import { Col, Row } from "antd";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { ONE_DOWGO_UNIT, ONE_USDC_UNIT } from "../../constants";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down-icon.svg";

interface FundInformationRowProps {
  openFundDetails: boolean;
  toggleDetails: () => void;
}

export function FundInformationRow(props: FundInformationRowProps) {
  const { openFundDetails, toggleDetails } = props;
  const { state } = useContext(AppContext);

  const tokenPrice = Number(state.price) / Number(ONE_USDC_UNIT);
  const tokenPriceFixedDecimals = tokenPrice.toLocaleString(undefined,{maximumFractionDigits: 2})
  const aum = (
    (Number(state.totalSupply) * Number(state.price)) /
    Number(ONE_DOWGO_UNIT) /
    Number(ONE_USDC_UNIT)
  ).toLocaleString(undefined,{maximumFractionDigits: 2})
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                background: "#54FFB7",
                marginRight: "8px",
              }}
            ></span>
            <span className="fund-info-name">Active</span>
          </div>
          {/*
          TODO: add performance when we have a longer history on the Fund
           */}
          <div className="fund-info-box">
            <div className="fund-info-name">AUM</div>
            <div className="fund-info-value">{`$${aum.toLocaleString()}`}</div>
          </div>
          <div className="fund-info-box">
            <div className="fund-info-name">TokenPrice</div>
            <div className="fund-info-value">{`$${tokenPriceFixedDecimals}`}</div>
          </div>
          <div className="arrow-box">
            {openFundDetails ? (
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
