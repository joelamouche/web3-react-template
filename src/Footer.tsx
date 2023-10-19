import { Row } from 'antd';
import { Footer } from "antd/lib/layout/layout";
import { smallIconStyle } from "./styles/iconStyle";
import { regularWhiteWord } from "./styles/textStyles";
import { ReactComponent as HelpIcon } from "./assets/icons/help-circle-icon.svg";
import { ReactComponent as EtherscanLogo } from "./assets/icons/etherscan-logo-light.svg";

import "./Footer.scss";

export const DowgoFooter = () => {
  return (
    <Footer className="dowgo-footer-container">
      <Row className="footer-row-container">
        <span
          style={{
            width: "50%", 
            paddingTop: '10px'
          }}
        >
          <a
            href="https://sepolia.etherscan.io/address/0xd770c2f1dbe3553e155c01a9222f21c3430e7c03"
            target="_blank"
            rel="noopener noreferrer"
          >
            <EtherscanLogo 
              className="footer-etherscan-icon"
            />
          </a>
        </span>

        <span
          style={{
            display: "flex"
          }}
        >
          <a
            href="https://us21.list-manage.com/contact-form?u=389cec789e7c3ea7cb5fc5e67&form_id=10ec5e5db49734ba1325f9fd7eb6df3b"
            target="_blank"
            rel="noopener noreferrer"
            className='footer-help-icon'
          >
            <HelpIcon style={smallIconStyle} />
            <span style={{ ...regularWhiteWord, marginLeft: "10px" }}>Help</span>
          </a>
          <a
            href="https://dowgo.gitbook.io/dowgo-doc/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span style={{ ...regularWhiteWord, marginLeft: "24px" }}>Docs</span>
          </a>
        </span>
      </Row>
    </Footer>
  );
};
