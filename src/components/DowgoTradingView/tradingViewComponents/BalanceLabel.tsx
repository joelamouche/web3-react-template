import { lightGrey, primaryColor, white } from "../../../styles/colors";

interface BalanceLabelProps {
  balance: number;
}
export function BalanceLabel(props: BalanceLabelProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        width: "100%",
        alignItems: "center",
        marginTop: "5px",
      }}
    >
      <span
        style={{
          color: white,
          fontWeight: 400,
          fontSize: "14px",
          fontFamily: "Montserrat",
        }}
      >
        {`Balance: ${props.balance}`}
      </span>
      <span
        style={{
          color: primaryColor,
          marginLeft: "8px",
          fontFamily: "Montserrat",
        }}
      >
        (Max)
      </span>
    </div>
  );
}
