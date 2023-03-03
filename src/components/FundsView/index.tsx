import { Col, Row } from "antd";
import "./index.styles.scss";

import { ReactComponent as ClockIcon } from "../../assets/icons/clock-icon.svg";
import { lightGrey } from "../../styles/colors";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { ONE_DOWGO_UNIT, ONE_USDC_UNIT } from "../../constants";

function FundsView() {
  const { state } = useContext(AppContext);
  const tokenPrice = Number(state.price) / Number(ONE_USDC_UNIT);
  const tokenPriceFixedDecimals = tokenPrice.toFixed(2);
  const aum = (
    (Number(state.totalSupply) * Number(state.price)) /
    Number(ONE_DOWGO_UNIT) /
    Number(ONE_USDC_UNIT)
  ).toFixed(2);
  return (
    <div className="funds-container">
      <div className="funds-title">Dowgo Funds</div>
      <div className="funds-row">
        <Row>
          <Col span={6}>
            <div className="fund-name">DOWGO ONE</div>
            <div className="fund-subtitle">
              <span className="fund-tag">DWG</span>
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
            <div className="fund-info-box">
              <div className="fund-info-name">Performance</div>
              <div className="fund-info-value">{`$${1324.43}`}</div>
            </div> */}
              <div className="fund-info-box">
                <div className="fund-info-name">AUM</div>
                <div className="fund-info-value">{`$${aum}`}</div>
              </div>
              <div className="fund-info-box">
                <div className="fund-info-name">TokenPrice</div>
                <div className="fund-info-value">{`$${tokenPriceFixedDecimals}`}</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="funds-row">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ClockIcon
            style={{
              color: lightGrey,
              height: "20px",
              width: "20px",
            }}
          />
          <div className="other-funds-text">Other funds coming soon...</div>
        </div>
      </div>
    </div>
  );
}

export default FundsView;
