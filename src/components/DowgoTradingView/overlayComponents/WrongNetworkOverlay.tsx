import { switchNetwork } from "../../../calls/metamask/switchNetwork";
import { smallIconStyle } from "../../../styles/iconStyle";

import { ReactComponent as SwitchIcon } from "../../../assets/icons/switch-icon.svg";
import { ChainId } from "../../../types/types";
import { ALLOWED_NETWORKS } from "../../../constants";

export const WrongNetworkOverlay = () => {
  return (
    <div className="trading-container-overlay">
      <div>
        <div className="overlay-warning">Network Not Supported</div>
        <div className="overlay-text">
          Please switch to an authorized network to fully enjoy our trading
          features.
        </div>
        <div
          className="overlay-action-text"
          onClick={() => {
            switchNetwork(ChainId[ALLOWED_NETWORKS[0]]);
          }}
        >
          <SwitchIcon style={{ ...smallIconStyle, marginRight: "10px" }} />
          Switch to {ALLOWED_NETWORKS[0]}
        </div>
      </div>
    </div>
  );
};
