import { useEffect, useState } from "react";
import Web3 from "web3";

function useWeb3() {
  const [web3, setWeb3] = useState();
  const [app, setapp] = useState();
  useEffect(() => {
    if (typeof web3 !== "undefined") {
      // If a web3 instance is already provided by Meta Mask.
      setapp({ web3Provider: web3.currentProvider });
      setWeb3(new Web3(web3.currentProvider));
    } else {
      // Specify default instance if no web3 instance provided
      setapp({
        web3Provider: new Web3.providers.HttpProvider("http://localhost:7545"),
      });
      setWeb3(new Web3(app.web3Provider));
    }
  }, []);

  return {
    web3,
    app,
  };
}
