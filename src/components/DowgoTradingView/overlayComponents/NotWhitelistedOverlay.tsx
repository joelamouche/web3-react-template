import jsonp from "jsonp";

import { ChainId } from "../../../types/types";
import { ALLOWED_NETWORKS } from "../../../constants";
import { useContext, useState } from "react";
import AppContext from "../../../context/AppContext";
import { countryList } from "../../../constants/countryList";
import { ethers } from "ethers";
import { whitelistUserAndRefresh } from "../../../actions/api/whitelistUser";

export const NotWhitelistedOverlay = () => {
  const { state, dispatch } = useContext(AppContext);

  const [ethKey, setEthKey] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const url =
      "https://dowgo.us21.list-manage.com/subscribe/post-json?u=389cec789e7c3ea7cb5fc5e67&amp;id=6f5867262d&amp;f_id=0069f5e1f0"; // you can use .env file to replace this

    if (!ethers.utils.isAddress(ethKey)) {
      setErrorMsg("This is not a valid Ethereum Public Address");
    } else if (ethKey !== "" && email !== "" && country !== "") {
      setErrorMsg("Sending information and whitelisting...");
      jsonp(
        `${url}&ETHKEY=${ethKey}&EMAIL=${email}&COUNTRY=${country}`,
        { param: "c" },
        (_, { msg }) => {
          setErrorMsg(
            errorMsg === "Thank you for subscribing!"
              ? `Thank you for subscribing! Whitelisting address and sending mockUSDT within a few minutes...`
              : `Whitelisting address and sending mockUSDT within a few minutes... Error during email registration : ${msg}`
          );
        }
      );
      let resp = await whitelistUserAndRefresh(dispatch, state);
    } else {
      setErrorMsg(
        "Whitelisting address and sending mockUSDT within a few minutes..."
      );
      let resp = await whitelistUserAndRefresh(dispatch, state);
    }
  };

  const supportedNetwork =
    state.chainId && ALLOWED_NETWORKS.includes(ChainId[state.chainId]);
  const isDisplayed =
    supportedNetwork && !state.isWhitelisted && state.currentAccount !== "0x";
  return (
    <div className={isDisplayed ? "get-whitelisted-container" : "hidden"}>
      <div>
        <div className="overlay-warning">
          This Eth Address is not whitelisted.
        </div>
        <div className="overlay-text">
          <div>Please fill this form to get whitelisted.</div>
          <div>Optionally, add Email and Country to stay in touch.</div>
        </div>
        <div style={{ marginTop: "40px" }}>
          <div className="dowgo-input-label">Ethereum Public Key*</div>
          <input
            value={ethKey}
            className="dowgo-input"
            placeholder="Enter your ethereum public key for Sepolia testing"
            onChange={(e) => setEthKey(e.target.value)}
          />
          <div className="dowgo-input-label">Email (optional)</div>
          <input
            value={email}
            className="dowgo-input"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="dowgo-input-label">Country (optional)</div>
          <select
            className="dowgo-input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countryList.map((c) => {
              return (
                <option className="dowgo-input" key={c} value={c}>
                  {c}
                </option>
              );
            })}
          </select>
          <div
            className={
              errorMsg === "Thank you for subscribing!"
                ? "dowgo-success-message"
                : "dowgo-error-message"
            }
          >
            {errorMsg}
            {/* {errorMsg === "Thank you for subscribing! We will send you an email when you are whitelisted."
                ? "dowgo-success-message"
                : errorMsg} */}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "20px",
            }}
          >
            <button onClick={onSubmit} className="fund-button">
              Get Whitelisted
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
