import { useContext } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import AppContext from "../../context/AppContext";
import { EthAddress } from "../../types/types";
import { RoundButton } from "../displayComponents/RoundButton";
import CopyButton from "../displayComponents/CopyButton";

// Icons
import { ReactComponent as LogOutIcon } from "../../assets/icons/log-out-icon.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/settings-icon.svg";

import { smallIconStyle } from "../../styles/iconStyle";
import { lightGrey, primaryColor } from "../../styles/colors";

export const shortenedAddress = (address: EthAddress): string => {
  return `${address.substring(0, 4)}...${address.substring(38, 42)}`;
};
const handleLogout = async () => {
  try {
    // Request the user to disconnect from the DApp
    //@ts-ignore
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });
    // Disconnect the user from the wallet
    //@ts-ignore
    await window.ethereum.request({ method: "wallet_disconnect" });
  } catch (err) {
    console.error(err);
  }
};

export const ProfileDropdown = () => {
  const { state, dispatch } = useContext(AppContext);

  return {
    key: "Profile",
    icon: RoundButton(() => {}, shortenedAddress(state.currentAccount)),

    children: [
      {
        key: "profileAccount",
        popupclassname: "dowgo-submenu",
        icon: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                ...smallIconStyle,
              }}
            >
              <Jazzicon
                diameter={24}
                seed={jsNumberForAddress(state.currentAccount)}
              />
            </div>

            <div style={{ marginLeft: "15px", marginRight: "20px" }}>
              {shortenedAddress(state.currentAccount)}
            </div>
            <CopyButton text={state.currentAccount} />
            <LogOutIcon
              onClick={() => {
                handleLogout();
              }}
              style={{ marginLeft: "80px", color: primaryColor }}
            />
            {/* TODO: add log out button */}
          </div>
        ),
      },
      {
        key: "profileSettings",
        popupclassname: "dowgo-submenu",
        icon: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <SettingsIcon style={{ ...smallIconStyle, color: lightGrey }} />

            <div style={{ marginLeft: "15px" }}>Account information</div>
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
