import { Button } from "antd";

export const RoundButton = (action: () => any, text: string) => {
  return (
    <Button
      style={{
        border: "2px solid #0FF4E9",
        boxShadow: "0px 0px 6px 3px rgba(84, 245, 255, 0.4)",
        borderRadius: "50px",
        backgroundColor: "black",
        color: "#0FF4E9",

        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "16px",
        lineHeight: "20px",
        fontFamily: "Montserrat",
      }}
      onMouseUp={() => {
        action();
      }}
    >
      {text}
    </Button>
  );
};
