import { Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { MetaMaskInpageProvider } from "@metamask/providers";

import "./header-animation";

import "./DowgoMenu.styles.css";
import { ProfileDropdown } from "./ProfileDropdown";
import { RoundButton } from "../displayComponents/RoundButton";
import ConnectMetaMask from "./ConnectMetaMask";
import { NetworkDropdown } from "./NetworkDropdown";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

function DowgoMenu() {
  const { state, dispatch } = useContext(AppContext);
  const menuItems: MenuProps["items"] = [
    {
      key: "Invest",
      icon: (
        <Link to="invest" className="funds-menu-item">
          Invest
        </Link>
      ),
    },
    {
      key: "My Portfolio",
      icon: (
        <Link to="my-portfolio" className="funds-menu-item">
          My Portfolio
        </Link>
      ),
    },
    {
      key: "Funds",
      icon: (
        <Link to="dowgo-funds" className="funds-menu-item">
          Funds
        </Link>
      ),
    },
    {
      key: "Withdraw",
      icon: (
        <Link to="withdraw" className="funds-menu-item">
          Withdraw
        </Link>
      ),
    },
    NetworkDropdown(),
    state.currentAccount === "0x" ? ConnectMetaMask() : ProfileDropdown(),
  ];

  return (
    <div>
      <Menu
        theme="dark"
        mode="horizontal"
        className="menu-container"
        items={menuItems}
      >
        {/* <Menu.Item key="dowgo-funds" className="">
          <Link to="dowgo-funds" className="funds-menu-item">
            FUNDS
          </Link>
        </Menu.Item>

        <Menu.Item key="governance" className="">
          GOVERNANCE
        </Menu.Item>
        <Menu.SubMenu
          key="profile-container"
          icon={
            <Link to="/profile" className="profile-icon-link">
              <ProfileIcon className="dowgo-menu-icon" />
            </Link>
          }
        >
          <Menu.Item key="zero" className="">
            <div className="status-menu-item">
              Status :{" "}
              <span
                style={{
                  color:
                    status === "Connected"
                      ? "green"
                      : status === "Disconnected"
                      ? "red"
                      : "orange",
                }}
              >
                {status}
              </span>
            </div>
          </Menu.Item>
          <Menu.Item key="un" className="">
            <div className="account-menu-item">
              Account:{" "}
              {state.currentAccount !== "0x"
                ? `${state.currentAccount.substring(
                    0,
                    4
                  )}...${state.currentAccount.substring(38, 42)}`
                : "Not Connected"}
            </div>
          </Menu.Item>
          <Menu.Item key="deux" className="">
            <div className="chain-menu-item">
              Chain: {state.chainId ? ChainId[state.chainId] : "Unkown Chain"}
              {supportedNetwork ? null : (
                <span style={{ color: "red" }}> Unsupported Network</span>
              )}
            </div>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="trois" className="">
          {state.provider &&
            DButton(() => {
              connect(window.ethereum as MetaMaskInpageProvider);
            }, `Connect to MetaMask`)}
        </Menu.Item> */}
      </Menu>
    </div>
  );
}

export default DowgoMenu;
