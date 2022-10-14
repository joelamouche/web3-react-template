import { BigNumber } from "ethers";
import { ONE_USDC_UNIT } from "../../constants";

function USDCBalance(usdcBalance: BigNumber) {
  return <div>{`${Number(usdcBalance) / Number(ONE_USDC_UNIT)} USDC`}</div>;
}

export default USDCBalance;
