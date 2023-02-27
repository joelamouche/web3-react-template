import React, { ReactNode } from "react";
import { Card, Col, InputNumber, Row } from "antd";
import { BigNumber, ethers, providers } from "ethers";
import {
  EthAddress,
  ChainId,
  SetStateFunction,
  ContractAddresses,
} from "../../types/types";
import { DowgoERC20 } from "../../types/DowgoERC20";
import { DowgoERC20ABI } from "../../constants/DowgoERC20ABI";
import { ONE_DOWGO_UNIT, ONE_USDC_UNIT } from "../../constants";
import { ERC20 } from "../../types/ERC20";
import { ERC20_ABI } from "../../constants/ERC20ABI";
import { BuyComponent } from "./BuyComponent";
import { SellComponent } from "./SellComponent";
import { WithdrawComponent } from "./WithdrawComponent";

import "./DowgoTradingInterface.styles.scss";
import { lightGrey, white } from "../../styles/colors";
import { smallIconStyle } from "../../styles/iconStyle";
import { AmountLabel } from "./tradingViewComponents/AmountLabel";
import { ReactComponent as USDTIcon } from "../../assets/icons/usdt-icon.svg";
import { ReactComponent as DowgoIcon } from "../../assets/icons/dowgo-icon.svg";
import { TradingInput } from "./tradingViewComponents/TradingInput";
import { BalanceLabel } from "./tradingViewComponents/BalanceLabel";
import { TradeButton } from "../displayComponents/TradeButton";

const margin = "0.5em";

function DowgoTradingInterface() {
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
                      <USDTIcon style={smallIconStyle} />
                    </div>
                  }
                />
              </div>
            </Row>
            <Row>
              <BalanceLabel balance={100} />
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
                      <DowgoIcon style={smallIconStyle} />
                    </div>
                  }
                />
              </div>
            </Row>
            <Row>
              <BalanceLabel balance={100} />
            </Row>
          </Col>
        </Row>
        <Row>{TradeButton(() => {}, "Approve USDT")}</Row>
      </div>
    </div>
  );
}

export default DowgoTradingInterface;
