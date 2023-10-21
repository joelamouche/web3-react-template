import React, { useState } from 'react';
import { Menu, MenuProps } from "antd";

import { Link } from "react-router-dom";
import { ProfileDropdown } from "../ProfileDropdown";
import ConnectMetaMask from "../ConnectMetaMask";
import { NetworkDropdown } from "../NetworkDropdown";
import { useContext } from "react";
import AppContext from "../../../context/AppContext";

import { ReactComponent as MobileMenuIcon} from '../../../assets/header/mobileMenuIcon.svg';
import { ReactComponent as MobileInvestIcon} from '../../../assets/header/menuMobile/invest-token.svg';
import { ReactComponent as MobileFundsIcon} from '../../../assets/header/menuMobile/funds-icon.svg';
import { ReactComponent as MobileMyPortfolioIcon} from '../../../assets/header/menuMobile/myportfolio-icon.svg';
import { ReactComponent as MobileWithdrawIcon} from '../../../assets/header/menuMobile/withdraw-icon.svg';

import "./DowgoMenuMobile.styles.scss";

function DowgoMenuMobile() {
  
  const { state } = useContext(AppContext);
  const [collapsed, setCollapsed] = useState(true);
  const [isActive, setIsActive] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    setIsActive(current => !current);
  };


  const menuItems: MenuProps["items"] = [
    {
      key: "Invest",
      icon: (
        <MobileInvestIcon className='mobile-menu-icon-invest'/> 
      ),
      label: (
        <>
          {
            collapsed ? ""
            :
              <Link 
                to="invest" 
                className="dowgo-menu-item-invest"
                onClick={toggleCollapsed}
              >
                Invest
              </Link>
          }
        </>
      ),
    },
    {
      key: "My Portfolio",
      icon: (
        <MobileMyPortfolioIcon className='mobile-menu-items-icon mobile-myportfolio-icon'/>
      ), 
      label: (
        <>
          {
            collapsed ? ""
            :
              <Link 
                to="my-portfolio" 
                className="dowgo-menu-item"
                onClick={toggleCollapsed}
              >
                My Portfolio
              </Link>
          }
        </>
      ),
    },
    {
      key: "Funds",
      icon: (
        <MobileFundsIcon className='mobile-menu-items-icon'/>
      ),
      label: (
        <>
          {
            collapsed ? ""
            :
              <Link 
                to="dowgo-funds" 
                className="dowgo-menu-item"
                onClick={toggleCollapsed}
              >
                Funds
              </Link>
          }
        </>
      ),
    },
    {
      key: "Withdraw",
      icon: (
        <MobileWithdrawIcon className='mobile-menu-items-icon'/>
      ),
      label: (
        <>
          {
            collapsed ? ""
            :
              <Link 
                to="withdraw" 
                className="dowgo-menu-item"
                onClick={toggleCollapsed}
              >
                Withdraw
              </Link>
          }
        </>
      ),
    },
    NetworkDropdown(),
    state.currentAccount === "0x" ? ConnectMetaMask() : ProfileDropdown(),
  ];

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
