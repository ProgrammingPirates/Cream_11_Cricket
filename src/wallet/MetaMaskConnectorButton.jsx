import { injected } from "./connectors";
import { useWeb3React } from "@web3-react/core";
import { Button } from "@mui/material";
import useUserContract from "hooks/useUserContract";

function MetaMaskConector() {
  const { activate, active, library, connector, deactivate, account, error } =
    useWeb3React();
  if (error) console.error(error);
  const { initContract, createUser, userInstance } = useUserContract();
  async function connectWallet() {
    try {
      await activate(injected);
      const instance = await initContract();
      console.log(
        instance.createUser("0x883cC4DD066D607c4A533Bd2AABCC90BAab7C435", {
          from: "0x883cC4DD066D607c4A533Bd2AABCC90BAab7C435",
        })
      );

      // instance
      //   .request({
      //     method: "createUser",
      //     params: ["0x883cC4DD066D607c4A533Bd2AABCC90BAab7C435"],
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   });
      // await instance.createUser("0x883cC4DD066D607c4A533Bd2AABCC90BAab7C435");
      //await createUser("0x883cC4DD066D607c4A533Bd2AABCC90BAab7C435");
      console.log(account);
      console.log(active);
      console.log(userInstance);
    } catch (exeption) {
      console.error(exeption);
    }
  }

  async function disconnectWallet() {
    try {
      await deactivate();
    } catch (ex) {
      console.error(ex);
    }
  }
  return (
    <>
      <Button
        variant="outlined"
        color={active ? "success" : "primary"}
        onClick={connectWallet}
      >
        {active ? `Connected to ${account}` : "Connect to MetaMask"}
      </Button>
      {active && (
        <Button
          variant="contained"
          color="error"
          sx={{ mx: 1 }}
          onClick={disconnectWallet}
        >
          Disconnect
        </Button>
      )}
    </>
  );
}
export default MetaMaskConector;
