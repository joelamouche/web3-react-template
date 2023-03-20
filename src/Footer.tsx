import { Footer } from "antd/lib/layout/layout";
import EtherscanLogo from "./assets/icons/etherscan-icon.png";
import { smallIconStyle } from "./styles/iconStyle";
import { white } from "./styles/colors";
import { regularWhiteWord } from "./styles/textStyles";
import { ReactComponent as HelpIcon } from "./assets/icons/help-circle-icon.svg";

export const DowgoFooter = () => {
  return (
    <Footer
      style={{
        display: "flex",
        alignItems: "center",
        height: "90px",
        width: "100%",
        justifyContent: "flex-end",
      }}
    >
      <span
        style={{
          left: 0,
          position: "relative",
        }}
      >
        <img src={EtherscanLogo} alt="etherscan-logo" style={smallIconStyle} />
      </span>
      <span
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <HelpIcon style={smallIconStyle} />
        <span style={{ ...regularWhiteWord, marginLeft: "10px" }}>Help</span>
        <span style={{ ...regularWhiteWord, marginLeft: "24px" }}>Docs</span>
      </span>
    </Footer>
  );
};
