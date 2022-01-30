import { useState } from "react";
import contract from "truffle-contract";
import UserContract from "smart-contract/build/contracts/User.json";

export default function useUserContract() {
  const [userContract, setContract] = useState();
  const [instance, setInstance] = useState();
  async function initContract() {
    const newContract = contract(UserContract);
    if (!window.web3) {
      console.error("web3 not initialized");
      return;
    }
    newContract.setProvider(window.ethereum);
    return new Promise((resolve, reject) => {
      newContract
        .deployed()
        .then((instance) => {
          setInstance(instance);
          resolve(instance);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  async function createUser(_uid) {
    return new Promise((resolve, reject) => {
      instance
        .createUser(_uid)
        .then((tx) => {
          resolve(tx);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async function createTeam(_uid, matchid, players) {
    return await instance.createTeam(_uid, matchid, players, { from: _uid });
  }

  return {
    createUser,
    initContract,
    userInstance: instance,
    createTeam,
  };
}
