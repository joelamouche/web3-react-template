import { Menu } from "antd";
import { ReactComponent as EthereumIcon } from "../../assets/icons/ethereum-icon.svg";
import { ReactComponent as SwitchIcon } from "../../assets/icons/switch-icon.svg";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { ChainId, EthAddress } from "../../types/types";
import { ALLOWED_NETWORKS } from "../../constants";
import { shortenedAddress } from "./ProfileDropdown";
import { smallIconStyle } from "../../styles/iconStyle";

const switchNetwork = async (chainId) => {
  try {
    //@ts-ignore
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  } catch (error) {
    console.log(error);
  }
};

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
  //   return (
  //     <Menu.SubMenu
  //       key="profile-container"
  //       icon={
  //         <ProfileIcon className="dowgo-menu-icon" />
  //         // <Link to="/profile" className="profile-icon-link">
  //         //   <ProfileIcon className="dowgo-menu-icon" />
  //         // </Link>
  //       }
  //     >
  //       <Menu.Item key="zero" className="">
  //         <div className="status-menu-item">
  //           Status :{" "}
  //           <span
  //             style={{
  //               color:
  //                 status === "Connected"
  //                   ? "green"
  //                   : status === "Disconnected"
  //                   ? "red"
  //                   : "orange",
  //             }}
  //           >
  //             {status}
  //           </span>
  //         </div>
  //       </Menu.Item>
  //       <Menu.Item key="un" className="">
  //         <div className="account-menu-item">
  //           Account:{" "}
  //           {state.currentAccount !== "0x"
  //             ? `${state.currentAccount.substring(
  //                 0,
  //                 4
  //               )}...${state.currentAccount.substring(38, 42)}`
  //             : "Not Connected"}
  //         </div>
  //       </Menu.Item>
  //       <Menu.Item key="deux" className="">
  //         <div className="chain-menu-item">
  //           Chain: {state.chainId ? ChainId[state.chainId] : "Unkown Chain"}
  //           {supportedNetwork ? null : (
  //             <span style={{ color: "red" }}> Unsupported Network</span>
  //           )}
  //         </div>
  //       </Menu.Item>
  //     </Menu.SubMenu>
  //   );
};
