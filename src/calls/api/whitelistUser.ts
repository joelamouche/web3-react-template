import axios from "axios";
import { EthAddress } from "../../types/types";

export const whitelistUser = async (userAddress: EthAddress): Promise<any> => {
  try {
    const resp = await axios.post(
      `https://211thuucd8.execute-api.eu-west-3.amazonaws.com/whitelistUserSepolia/${userAddress}`
    ); //.data;
    console.log("resp", resp);
    return resp;
  } catch (error) {
    console.log("Error during whitelist user");
    console.error(error);
  }
};
