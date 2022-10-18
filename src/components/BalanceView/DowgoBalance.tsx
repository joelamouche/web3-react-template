import { BigNumber } from "ethers";
import { ONE_DOWGO_UNIT, ONE_USDC_UNIT } from "../../constants";
function DowgoBalance(dowgoBalance: BigNumber, price: BigNumber) {
  return (
    <div>{`User Dowgo Balance : ${
      Number(dowgoBalance) / Number(ONE_DOWGO_UNIT)
    } DWG = ${
      (Number(dowgoBalance) * Number(price)) /
      Number(ONE_DOWGO_UNIT) /
      Number(ONE_USDC_UNIT)
    } USD`}</div>
  );
}

export default DowgoBalance;
