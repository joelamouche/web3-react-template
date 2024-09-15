import { Col, Row } from "antd";
import { useContext, useState } from "react";
import "./index.styles.scss";

import { ReactComponent as ClockIcon } from "../../assets/icons/clock-icon.svg";
import { lightGrey } from "../../styles/colors";
import AppContext from "../../context/AppContext";
import { ONE_DOWGO_UNIT, ONE_USDC_UNIT } from "../../constants";

import { FundDetails } from "./FundDetails";
import { FundInformationRow } from "./FundInformationRow";

function FundsView() {
  const [openFundDetails, setOpenFundDetails] = useState<boolean>(false);

  function toggleDetails() {
    setOpenFundDetails(!openFundDetails);
  }

  return (
    <div className="funds-container">
      <div className="funds-title">Dowgo Funds</div>
      <div className="fund-container">
        <FundInformationRow
          openFundDetails={openFundDetails}
          toggleDetails={toggleDetails}
        />
        <FundDetails openFundDetails={openFundDetails} />
      </div>
      <div className="fund-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ClockIcon
            style={{
              color: lightGrey,
              height: "20px",
              width: "20px",
            }}
          />
          <div className="other-funds-text">Other funds coming soon...</div>
        </div>
      </div>
    </div>
  );
}

export default FundsView;
