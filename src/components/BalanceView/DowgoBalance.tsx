import React, { useEffect } from "react";
import { BigNumber, ethers, providers } from "ethers";
function DowgoBalance(dowgoBalance: BigNumber) {
  return <div>{`${Number(dowgoBalance) / 10 ** 18} Dowgo`}</div>;
}

export default DowgoBalance;
