import React, { ReactNode, useState } from "react";
import { Card, Col, InputNumber, Row } from "antd";
import { BigNumber, ethers, providers } from "ethers";

// Logos
import DowgoLogo from "../../assets/icons/dowgo-logo.png";
import USDTLogo from "../../assets/icons/usdt-logo.png";

import "./DowgoTradingInterface.styles.scss";
import { lightGrey, white } from "../../styles/colors";
import { smallIconStyle } from "../../styles/iconStyle";
import { AmountLabel } from "./tradingViewComponents/AmountLabel";
import { TradingInput } from "./tradingViewComponents/TradingInput";
import { BalanceLabel } from "../displayComponents/BalanceLabel";
import { TradeButton } from "../displayComponents/TradeButton";

const margin = "0.5em";

function DowgoTradingInterface() {
  const [buyInput, setBuyInput] = useState<BigNumber>(BigNumber.from(0));
  return (
    <div className="trading-top-container">
      <div className="trading-prompt">
        Start investing by swapping our tokens below
      </div>
      <div className="trading-container">
        <Row>
          <Col span={11}>
            <Row>
              <AmountLabel min={10} max={1000} />
            </Row>
            <Row>
              <div style={{ marginTop: "8px" }}>
                <TradingInput
                  min={1}
                  max={10}
                  defaultValue={0}
                  addonAfter={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "8px", fontWeight: 600 }}>
                        USDT
                      </span>
                      <img
                        src={USDTLogo}
                        alt="usdt-logo"
                        style={smallIconStyle}
                      />
                    </div>
                  }
                />
              </div>
            </Row>
            <Row>
              <BalanceLabel balance={100} text={"Balance"} />
            </Row>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <Row>
              <AmountLabel min={10} max={1000} />
            </Row>
            <Row>
              <div style={{ marginTop: "8px" }}>
                <TradingInput
                  min={1}
                  max={10}
                  defaultValue={0}
                  addonAfter={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "8px", fontWeight: 600 }}>
                        DOWGO1
                      </span>
                      <img
                        src={DowgoLogo}
                        alt="dowgo-logo"
                        style={smallIconStyle}
                      />
                    </div>
                  }
                />
              </div>
            </Row>
            <Row>
              <BalanceLabel balance={100} text={"Balance"} />
            </Row>
          </Col>
        </Row>
        <Row>{TradeButton(() => {}, "Approve USDT")}</Row>
      </div>
    </div>
  );
}

export default DowgoTradingInterface;
