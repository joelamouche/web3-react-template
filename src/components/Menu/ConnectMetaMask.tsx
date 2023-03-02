import React, { useContext, useEffect } from "react";

import { Dropdown, MenuProps } from "antd";
import "./header-animation";

import AppContext from "../../context/AppContext";
import { RoundButton } from "../displayComponents/RoundButton";

//icons
import { ReactComponent as InfoIcon } from "../../assets/icons/info-icon.svg";
import { ReactComponent as MetamaskIcon } from "../../assets/icons/metamask-icon.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/icons/arrow-right-icon.svg";

import { smallIconStyle } from "../../styles/iconStyle";
import { lightGrey, primaryColor } from "../../styles/colors";
import { fetchAndSaveChainId } from "../../actions/metamask/fetchAndSaveChainId";
import { fetchAndSaveAccount } from "../../actions/metamask/fetchAndSaveAccount";
import { fetchAndSaveProvider } from "../../actions/metamask/fetchAndSaveProvider";
import { fetchContractAddresses } from "../../calls/api/fetchContractAddresses";
import { fetchAndSaveContractAddresses } from "../../actions/api/fetchAndSaveContractAddresses";
import { fetchAndSaveContractInformations } from "../../actions/contracts/fetchAndSaveContractInformations";
import { fetchAndSaveAccountAndChainId } from "../../actions/metamask/fetchAndSaveAccountAndChainId";

function ConnectMetaMask() {
  const { state, dispatch } = useContext(AppContext);

  const items: MenuProps["items"] = [
    {
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontStyle: "italic", color: lightGrey }}>
            Metamask is either locked or not installed
          </span>
          <InfoIcon
            style={{ ...smallIconStyle, color: lightGrey, marginLeft: "10px" }}
          />
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <MetamaskIcon style={smallIconStyle} />
          <a style={{ margin: "0 16px" }} href="https://metamask.io/download/">
            Install Metamask
          </a>
          <ArrowRightIcon style={{ ...smallIconStyle, color: primaryColor }} />
        </div>
      ),
      key: "1",
    },
  ];

  return {
    key: "Connect",
    icon: (
      <Dropdown menu={{ items }} open={state.needMMUnlock}>
        {RoundButton(() => {
          fetchAndSaveAccount(dispatch);
        }, "Connect")}
      </Dropdown>
    ),
  };
}

export default ConnectMetaMask;
