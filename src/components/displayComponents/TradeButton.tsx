import { Button } from "antd";

import { ReactComponent as MetamaskIcon } from "../../assets/header/metamask.svg";

export const TradeButton = (action: () => any, text: string) => {
  return (
    <Button
      style={{
        border: "1px solid #0FF4E9",
        borderRadius: "4px",
        backgroundColor: "transparent",
        color: "#0FF4E9",
        width: "100vw",
        height: "42px",
        padding: "8px",
        marginTop: "18px",

        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "16px",
        lineHeight: "20px",
      }}
      onMouseUp={() => {
        action();
      }}
    >
      {text}
      {/* TODO:add information logo for approve button */}
    </Button>
  );
};
