import { lightGrey, white } from "../../../styles/colors";
import { smallIconStyle } from "../../../styles/iconStyle";
import { ReactComponent as InfoIcon } from "../../../assets/icons/info-icon.svg";
import { regularWhiteWord } from "../../../styles/textStyles";

interface AmountProps {
  min: number;
  max: number;
}
export function AmountLabel(props: AmountProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <span style={regularWhiteWord}>Amount</span>
      <span
        style={{
          color: lightGrey,
          fontWeight: 400,
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          fontFamily: "Montserrat",
        }}
      >
        {`(min: ${props.min}, max ${props.max.toLocaleString(undefined,{maximumFractionDigits: 2})})`}
        <InfoIcon
          style={{
            color: lightGrey,
            marginLeft: "8px",
            height: "13px",
            width: "13px",
          }}
        />
      </span>
    </div>
  );
}
