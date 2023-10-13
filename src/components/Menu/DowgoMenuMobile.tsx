import React, { useState } from 'react';
import { Menu, MenuProps } from "antd";

import { Link } from "react-router-dom";
import { ProfileDropdown } from "./ProfileDropdown";
import ConnectMetaMask from "./ConnectMetaMask";
import { NetworkDropdown } from "./NetworkDropdown";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

import { ReactComponent as MobileMenuIcon} from '../../assets/header/mobileMenuIcon.svg';

import "./DowgoMenu.styles.scss";

function DowgoMenuMobile() {
  
  const { state } = useContext(AppContext);
  const [collapsed, setCollapsed] = useState(true);
  const [isActive, setIsActive] = useState(true);

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

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    setIsActive(current => !current);
  };

  return (
    <div className='mobile-menu-container'>
      <div 
        onClick={toggleCollapsed} 
        className='mobile-menu-btn'
      >
        <div className={isActive ? '' : 'active'} >
          <MobileMenuIcon />
        </div>
      </div>
      {collapsed ? ""
      : 
        <div className='mobile-menu-overlay'>
          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={menuItems}
          />
        </div>
        }
    </div>
  );
}

export default DowgoMenuMobile;
