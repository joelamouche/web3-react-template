import { EthAddress } from "../../../types/types";

import { DowgoERC20 } from "../../../types/DowgoERC20";
import { BigNumber, ethers } from "ethers";
import { DowgoERC20ABI } from "../../../constants/DowgoERC20ABI";

export const WHITELISTED_ROLE = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("WHITELISTED_ROLE")
);

export const fetchWhitelistedStatus = async (
  dowgoAddress: EthAddress,
  provider: ethers.providers.Provider,
  userEthAddress: EthAddress
): Promise<boolean> => {
  try {
    const contract: DowgoERC20 = new ethers.Contract(
      dowgoAddress,
      DowgoERC20ABI,
      provider
    ) as DowgoERC20;
    const isWhitelisted = await contract.hasRole(
      WHITELISTED_ROLE,
      userEthAddress
    );
    return isWhitelisted;
  } catch (error) {
    console.error(error);
  }
};
