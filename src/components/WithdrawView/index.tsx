import { useContext, useState } from "react";
import { InputNumber } from "antd";

// Logos
import USDTLogo from "../../assets/icons/usdt-logo.png";

import "./index.styles.scss";
import { smallIconStyle } from "../../styles/iconStyle";
import { BalanceLabel } from "../displayComponents/BalanceLabel";
import { TradeButton } from "../displayComponents/TradeButton";
import { regularWhiteWord } from "../../styles/textStyles";
import AppContext from "../../context/AppContext";
import { ONE_USDC_UNIT } from "../../constants";
import { withdrawUSDAndUpdate } from "../../actions/contracts/dowgoContract/withdrawUSDAndUpdate";
import { USDTComponent } from "../DowgoTradingView/tradingViewComponents/CurrencyComponents";

function WithdrawView() {
  const { state, dispatch } = useContext(AppContext);
  const usdBalanceOnContract =
    Number(state.usdBalanceOnDowgo) / Number(ONE_USDC_UNIT);

  const [withdrawInput, setWithdrawInput] = useState<number>(0);

  const onChange = (value: number) => {
    console.log("changed", value);
    setWithdrawInput(value);
  };

  return (
    <div className="withdraw-top-container">
      <div className="withdraw-title">Withdraw Tokens</div>
      <div className="withdraw-subtitle">
        <div style={{ maxWidth: "392px" }}>
          In order to secure your fund, we add a step to withdraw your funds
          from the smart contract.
        </div>
      </div>
      <div className="withdraw-container">
        <div className="withdraw-container-header">Withdraw</div>
        <div className="withdraw-container-content">
          <div style={regularWhiteWord}>Amount</div>
          <div
            style={{ marginTop: "12px", width: "100%" }}
            className="withdraw-input"
          >
            <InputNumber
              onChange={onChange}
              controls={false}
              min={0}
              max={usdBalanceOnContract}
              defaultValue={0}
              addonAfter={<USDTComponent />}
            />
          </div>
          <div style={{ width: "100%" }}>
            <BalanceLabel
              balance={usdBalanceOnContract}
              text={"Balance on contract"}
            />
          </div>
          <div style={{ width: "100%" }}>
            {TradeButton(() => {
              withdrawUSDAndUpdate(dispatch, state, withdrawInput);
            }, "Withdraw")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawView;
