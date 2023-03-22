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
import {
  ALLOWED_NETWORKS,
  ONE_DOWGO_UNIT,
  ONE_USDC_UNIT,
} from "../../constants";
import { approveUSDAndUpdate } from "../../actions/contracts/usdtContract/approveUSDAndUpdate";
import { ApproveButton } from "./tradingViewComponents/ApproveButton";
import { ChainId, Currency } from "../../types/types";
import { SwapButton } from "./tradingViewComponents/SwapButton";
import { useParams } from "react-router-dom";
import { WrongNetworkOverlay } from "./overlayComponents/WrongNetworkOverlay";

const { Option } = Select;

function DowgoTradingInterface() {
  const { state, dispatch } = useContext(AppContext);
  let { buyOrSell } = useParams();

  // Local State
  const [inputCurrency, setInputCurrency] = useState<Currency>(
    buyOrSell === "sell" ? "DWG1" : "USDT"
  );
  const [outputCurrency, setOutputCurrency] = useState<Currency>(
    buyOrSell === "sell" ? "USDT" : "DWG1"
  );
  const [inputValue, setInputValue] = useState<number>(0);
  const [outputValue, setOutputValue] = useState<number>(0);

  // Derived state values
  const usdBalance: number = Number(state.usdBalance) / Number(ONE_USDC_UNIT);
  const dowgoBalance: number =
    Number(state.dowgoBalance) / Number(ONE_DOWGO_UNIT);
  const allowance = Number(state.allowance) / Number(ONE_USDC_UNIT);
  const price = Number(state.price) / Number(ONE_USDC_UNIT);

  const isApprovalNeeded = inputCurrency === "USDT" && allowance < inputValue;

  // Maximum values
  const inputBalance = inputCurrency === "USDT" ? usdBalance : dowgoBalance;
  const outputBalance = inputCurrency === "USDT" ? dowgoBalance : usdBalance;
  const maxDowgoBuySell =
    Number(
      state.totalSupply
        .mul(state.targetRatio)
        .mul(state.collRange)
        .div(10 ** 8)
    ) / Number(ONE_DOWGO_UNIT);
  const inputMax =
    inputCurrency === "DWG1"
      ? Math.min(maxDowgoBuySell, dowgoBalance)
      : Math.min(maxDowgoBuySell * price, usdBalance);
  const outputMax =
    inputCurrency === "DWG1"
      ? Math.min(maxDowgoBuySell * price, dowgoBalance * price)
      : Math.min(maxDowgoBuySell, usdBalance / price);

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
    setOutputValue(value);
    if (outputCurrency === "USDT" && price !== 0) {
      setInputValue(value / price);
    } else {
      setInputValue(value * price);
    }
  }
  const supportedNetwork =
    state.chainId && ALLOWED_NETWORKS.includes(ChainId[state.chainId]);
  return (
    <div className="trading-top-container">
      <div className="trading-prompt">
        Start investing by swapping our tokens below
      </div>
      {!supportedNetwork && <WrongNetworkOverlay />}
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
        <Row>
          {isApprovalNeeded ? (
            <ApproveButton />
          ) : (
            <SwapButton
              inputCurrency={inputCurrency}
              inputAmount={inputValue}
            />
          )}
        </Row>
      </div>
    </div>
  );
}

export default DowgoTradingInterface;
