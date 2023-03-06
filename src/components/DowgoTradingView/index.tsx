import React, { ReactNode, useContext, useState } from "react";
import { Card, Col, InputNumber, Row, Select } from "antd";
import { BigNumber, ethers, providers } from "ethers";

import "./index.styles.scss";
import { AmountLabel } from "./tradingViewComponents/AmountLabel";
import { TradingInput } from "./tradingViewComponents/TradingInput";
import { BalanceLabel } from "../displayComponents/BalanceLabel";
import { TradeButton } from "../displayComponents/TradeButton";
import {
  DOWGOOneComponent,
  USDTComponent,
} from "./tradingViewComponents/CurrencyComponents";
import AppContext from "../../context/AppContext";
import { ONE_DOWGO_UNIT, ONE_USDC_UNIT } from "../../constants";

const { Option } = Select;

type Currency = "USDT" | "DWG1";

function DowgoTradingInterface() {
  const { state, dispatch } = useContext(AppContext);

  // Local State
  const [inputCurrency, setInputCurrency] = useState<Currency>("USDT");
  const [outputCurrency, setOutputCurrency] = useState<Currency>("DWG1");
  const [inputValue, setInputValue] = useState<number>(0);
  const [outputValue, setOutputValue] = useState<number>(0);

  // Derived state values
  const usdBalance: number = Number(state.usdBalance) / Number(ONE_USDC_UNIT);
  const dowgoBalance: number =
    Number(state.dowgoBalance) / Number(ONE_DOWGO_UNIT);
  const price = Number(state.price) / Number(ONE_USDC_UNIT);

  // Maximum values
  const inputBalance = inputCurrency === "USDT" ? dowgoBalance : usdBalance;
  const outputBalance = inputCurrency === "USDT" ? usdBalance : dowgoBalance;
  const maxDowgoBuySell =
    Number(
      state.totalSupply
        .mul(state.targetRatio)
        .mul(state.collRange)
        .div(10 ** 8)
    ) / Number(ONE_DOWGO_UNIT);
  const inputMax =
    inputCurrency === "DWG1"
      ? Math.min(maxDowgoBuySell, inputBalance)
      : Math.min(maxDowgoBuySell * price, inputBalance);

  const outputMax =
    inputCurrency === "DWG1"
      ? Math.min(maxDowgoBuySell / price, usdBalance / price)
      : Math.min(maxDowgoBuySell, dowgoBalance * price);

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
  function handleChangeInputValue(value) {
    setInputValue(value);
    if (inputCurrency === "USDT" && price !== 0) {
      setOutputValue(value / price);
    } else {
      setOutputValue(value * price);
    }
  }
  function handleChangeOutputValue(value) {
    setInputValue(value);
    if (inputCurrency === "USDT") {
      setOutputCurrency("DWG1");
    } else {
      setOutputCurrency("USDT");
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
              <AmountLabel min={0} max={inputMax} />
            </Row>
            <Row>
              <div style={{ marginTop: "8px" }}>
                <TradingInput
                  value={inputValue}
                  onChange={handleChangeInputValue}
                  min={0}
                  max={inputMax}
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
              <BalanceLabel balance={inputBalance} text={"Balance"} />
            </Row>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <Row>
              <AmountLabel min={0} max={outputMax} />
            </Row>
            <Row>
              <div style={{ marginTop: "8px" }}>
                <TradingInput
                  value={outputValue}
                  onChange={handleChangeOutputValue}
                  min={0}
                  max={outputMax}
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
              <BalanceLabel balance={outputBalance} text={"Balance"} />
            </Row>
          </Col>
        </Row>
        <Row>{TradeButton(() => {}, "Approve USDT")}</Row>
      </div>
    </div>
  );
}

export default DowgoTradingInterface;
