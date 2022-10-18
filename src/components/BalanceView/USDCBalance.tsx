import { BigNumber } from "ethers";
import { ONE_USDC_UNIT } from "../../constants";

function USDCBalance(usdcBalance: BigNumber) {
  return (
    <div>{`User USDC Balance : ${(
      Number(usdcBalance) / Number(ONE_USDC_UNIT)
    ).toFixed(2)} USDC`}</div>
  );
}

export default USDCBalance;
