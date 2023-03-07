import { useContext } from "react";
import { Currency } from "../../../types/types";
import { TradeButton } from "../../displayComponents/TradeButton";
import AppContext from "../../../context/AppContext";
import { buyDowgoAndUpdate } from "../../../actions/contracts/dowgoContract/buyDowgoAndUpdate";
import { sellDowgoAndUpdate } from "../../../actions/contracts/dowgoContract/sellDowgoAndUpdate";
import { ONE_USDC_UNIT } from "../../../constants";

export function SwapButton(props: {
  inputCurrency: Currency;
  inputAmount: number;
}) {
  const { state, dispatch } = useContext(AppContext);
  return TradeButton(() => {
    if (props.inputCurrency === "USDT") {
      const price = Number(state.price) / Number(ONE_USDC_UNIT);
      price !== 0 &&
        buyDowgoAndUpdate(dispatch, state, props.inputAmount / price);
    } else {
      sellDowgoAndUpdate(dispatch, state, props.inputAmount);
    }
  }, "Swap");
}
