import { smallIconStyle } from "../../../styles/iconStyle";
// Logos
import DowgoLogo from "../../../assets/icons/dowgo-logo.png";
import USDTLogo from "../../../assets/icons/usdt-logo.png";

export const USDTComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ marginRight: "8px", fontWeight: 600 }}>USDT</span>
      <img src={USDTLogo} alt="usdt-logo" style={smallIconStyle} />
    </div>
  );
};

export const DOWGOOneComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ marginRight: "8px", fontWeight: 600 }}>DWG1</span>
      <img src={DowgoLogo} alt="dowgo-logo" style={smallIconStyle} />
    </div>
  );
};
