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
    <a href="https://sepolia.etherscan.io/address/0xd770c2f1dbe3553e155c01a9222f21c3430e7c03" target="_blank" rel="noopener noreferrer">
      <img src={EtherscanLogo} alt="etherscan-logo" style={smallIconStyle} />
    </a>  
  </span>

      <span
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <a href="https://us21.list-manage.com/contact-form?u=389cec789e7c3ea7cb5fc5e67&form_id=10ec5e5db49734ba1325f9fd7eb6df3b" target="_blank" rel="noopener noreferrer">
          <HelpIcon style={smallIconStyle} />
          <span style={{ ...regularWhiteWord, marginLeft: "10px" }}>Help</span>
        </a>
        <a href="https://dowgo.gitbook.io/dowgo-doc/" target="_blank" rel="noopener noreferrer">
        <span style={{ ...regularWhiteWord, marginLeft: "24px" }}>Docs</span>
        </a>
      </span>
    </Footer>
  );
};
