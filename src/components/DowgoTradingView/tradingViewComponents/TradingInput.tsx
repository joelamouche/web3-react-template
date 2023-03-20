import { InputNumber } from "antd";
import "./TradingInput.styles.scss";

interface TradingInputProps {
  addonAfter: React.ReactNode;
  min: number;
  max: number;
  defaultValue: number;
  value: number;
  onChange: (number) => void;
}
export const TradingInput = (props: TradingInputProps) => {
  return (
    <InputNumber
      controls={false}
      value={props.value}
      onChange={props.onChange}
      min={props.min}
      max={props.max.toFixed(2)}
      defaultValue={props.defaultValue}
      addonAfter={props.addonAfter}
    />
  );
};
