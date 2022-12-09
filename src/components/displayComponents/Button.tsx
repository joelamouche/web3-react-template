import {Button} from "antd";

import {ReactComponent as MetamaskIcon} from '../../assets/header/metamask.svg';

export const DButton = (action: () => any, text: string) => {
  return (
    <Button
      style={{
        borderRadius: 50, 
        backgroundColor: 'black', 
        height: '40px',
        fontWeight: 500, 
        fontFamily: "'Inter', sans-serif",
        color: "#0ff4e9",
        border: "2px solid #0ff4e9", 
        alignItems: "center", 
        display: "flex", 
        boxShadow: "0 0 5px #0ff4e9,inset 0 0 5px #0ff4e9"
      }}
      onMouseUp={() => {
        action();
      }}
    >
      {text}
      <MetamaskIcon style={{
        height: 20, 
        width: "auto", 
        marginLeft: 10, 
      }} />
    </Button>
  );
};
