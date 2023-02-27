import { InputNumber } from "antd";
import "./TradingInput.styles.scss";

interface TradingInputProps {
  addonAfter: React.ReactNode;
  min: number;
  max: number;
  defaultValue: number;
}
export const TradingInput = (props: TradingInputProps) => {
  return (
    <InputNumber
      controls={false}
      min={props.min}
      max={props.max}
      defaultValue={props.defaultValue}
      addonAfter={props.addonAfter}
    />
  );
};
