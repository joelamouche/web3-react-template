import { BigNumber } from "ethers";
import { ONE_DOWGO_UNIT, ONE_USDC_UNIT } from "../../constants";
import { ReactComponent as DowgoTokenIcon } from "../../assets/metrics-banner/token-icon.svg";

function DowgoBalance(dowgoBalance: BigNumber, price: BigNumber) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontFamily: "var(--font-branded)",
      }}
    >
      <DowgoTokenIcon
        style={{
          height: 50,
          width: "auto",
          marginRight: 10,
        }}
      />
      {`${Number(dowgoBalance) / Number(ONE_DOWGO_UNIT)} DWG = ${
        (Number(dowgoBalance) * Number(price)) /
        Number(ONE_DOWGO_UNIT) /
        Number(ONE_USDC_UNIT)
      } USD`}
    </div>
  );
}

export default DowgoBalance;
