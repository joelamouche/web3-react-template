import { lightGrey, white } from "../../../styles/colors";
import { smallIconStyle } from "../../../styles/iconStyle";
import { ReactComponent as InfoIcon } from "../../../assets/icons/info-icon.svg";

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
      <span style={{ color: white, fontWeight: 400, fontSize: "16px" }}>
        Amount
      </span>
      <span
        style={{
          color: lightGrey,
          fontWeight: 400,
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {`(min: ${props.min}, max ${props.max})`}
        <InfoIcon
          style={{
            ...smallIconStyle,
            color: lightGrey,
            marginLeft: "8px",
          }}
        />
      </span>
    </div>
  );
}
