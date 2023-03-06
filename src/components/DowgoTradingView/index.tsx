import React, { ReactNode, useState } from "react";
import { Card, Col, InputNumber, Row, Select } from "antd";

import "./index.styles.scss";
import { AmountLabel } from "./tradingViewComponents/AmountLabel";
import { TradingInput } from "./tradingViewComponents/TradingInput";
import { BalanceLabel } from "../displayComponents/BalanceLabel";
import { TradeButton } from "../displayComponents/TradeButton";
import {
  DOWGOOneComponent,
  USDTComponent,
} from "./tradingViewComponents/CurrencyComponents";

const { Option } = Select;

type Currency = "USDT" | "DWG1";

function DowgoTradingInterface() {
  const [inputCurrency, setInputCurrency] = useState<Currency>("USDT");
  const [outputCurrency, setOutputCurrency] = useState<Currency>("DWG1");
  function handleChangeCurrencyInput(value) {
    setInputCurrency(value);
    if (value === "USDT") {
      setOutputCurrency("DWG1");
    } else {
      setOutputCurrency("USDT");
    }
  }
  function handleChangeCurrencyOutput(value) {
    setOutputCurrency(value);
    if (value === "USDT") {
      setInputCurrency("DWG1");
    } else {
      setInputCurrency("USDT");
    }
  }
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
                    <Select
                      defaultValue="USDT"
                      value={inputCurrency}
                      onChange={handleChangeCurrencyInput}
                    >
                      <Option value="USDT">
                        <USDTComponent />
                      </Option>
                      <Option value="DWG1">
                        <DOWGOOneComponent />
                      </Option>
                    </Select>
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
                    <Select
                      defaultValue="DWG1"
                      value={outputCurrency}
                      onChange={handleChangeCurrencyOutput}
                    >
                      <Option value="USDT">
                        <USDTComponent />
                      </Option>
                      <Option value="DWG1">
                        <DOWGOOneComponent />
                      </Option>
                    </Select>
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
