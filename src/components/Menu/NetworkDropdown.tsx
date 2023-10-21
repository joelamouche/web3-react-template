import { ReactComponent as EthereumIcon } from "../../assets/icons/ethereum-icon.svg";
import { ReactComponent as SwitchIcon } from "../../assets/icons/switch-icon.svg";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { ChainId } from "../../types/types";
import { ALLOWED_NETWORKS } from "../../constants";
import { smallIconStyle } from "../../styles/iconStyle";
import { switchNetwork } from "../../calls/metamask/switchNetwork";

export const NetworkDropdown = () => {
  const { state, dispatch } = useContext(AppContext);
  const supportedNetwork =
    state.chainId && ALLOWED_NETWORKS.includes(ChainId[state.chainId]);
  return {
    key: "NetworkDropdown",
    icon: <EthereumIcon className="dowgo-menu-icon" />,
    children: [
      {
        key: "network",
        icon: supportedNetwork ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <EthereumIcon />
            <span style={{ marginLeft: "10px" }}>{ChainId[state.chainId]}</span>
          </div>
        ) : (
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => {
              switchNetwork(ChainId[ALLOWED_NETWORKS[0]]);
            }}
          >
            <SwitchIcon style={{ ...smallIconStyle, marginRight: "10px" }} />
            Switch to {ALLOWED_NETWORKS[0]}
          </div>
        ),
      },
    ],
  };
};
