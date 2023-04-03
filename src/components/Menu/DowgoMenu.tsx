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
  const { state } = useContext(AppContext);
  const menuItems: MenuProps["items"] = [
    {
      key: "Invest",
      icon: (
        <Link to="invest" className="dowgo-menu-item">
          Invest
        </Link>
      ),
    },
    {
      key: "My Portfolio",
      icon: (
        <Link to="my-portfolio" className="dowgo-menu-item">
          My Portfolio
        </Link>
      ),
    },
    {
      key: "Funds",
      icon: (
        <Link to="dowgo-funds" className="dowgo-menu-item">
          Funds
        </Link>
      ),
    },
    {
      key: "Withdraw",
      icon: (
        <Link to="withdraw" className="dowgo-menu-item">
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
      ></Menu>
    </div>
  );
}

export default DowgoMenu;
