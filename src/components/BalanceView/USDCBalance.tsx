import { BigNumber } from "ethers";
import { ONE_USDC_UNIT } from "../../constants";
import { ReactComponent as UsdcIcon } from "../../assets/balance/usdc.svg";

function USDCBalance(usdBalance: BigNumber) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontFamily: "var(--font-branded)",
      }}
    >
      <UsdcIcon
        style={{
          height: 50,
          width: "auto",
          marginRight: 10,
        }}
      />
      {`${(Number(usdBalance) / Number(ONE_USDC_UNIT)).toFixed(2)} USDC`}
    </div>
  );
}

export default USDCBalance;
