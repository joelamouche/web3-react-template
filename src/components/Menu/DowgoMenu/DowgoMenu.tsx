import React, { useContext} from 'react';
import { Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";

import { ProfileDropdown } from "../ProfileDropdown";
import ConnectMetaMask from "../ConnectMetaMask";
import { NetworkDropdown } from "../NetworkDropdown";
import AppContext from "../../../context/AppContext";
import "./DowgoMenu.styles.scss";

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
    <div className='menu-desktop-container'>
      <Menu
        theme="dark"
        mode="horizontal"
        items={menuItems}
        className="menu-container"
      ></Menu>
    </div>
  );
}

export default DowgoMenu;
