import React, { useState, useEffect } from "react";
import getWeb3 from "../getWeb3";
import AccessControlAbi from "../abis/AccessControl.json";
import './AccessControl.css';
function AccessControl() {
  const [web3, setWeb3] = useState(null);
  const [accessControl, setAccessControl] = useState(null);
  const [fileId, setFileId] = useState("");
  const [address, setAddress] = useState("");
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const initWeb3 = async () => {
  try {
    const web3Instance = await getWeb3();
    const networkId = await web3Instance.eth.net.getId();
    const deployedNetwork = AccessControlAbi.networks[networkId];
    const instance = new web3Instance.eth.Contract(
      AccessControlAbi.abi,
      deployedNetwork && deployedNetwork.address
    );

    setWeb3(web3Instance);
    // eslint-disable-next-line no-undef
    setContract(instance);
  } catch (error) {
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`
    );
    console.error(error);
  }
};

    initWeb3();
  }, []);

  const grantAccess = async () => {
    const accounts = await web3.eth.getAccounts();

    try {
      await accessControl.methods
        .grantAccess(fileId, address)
        .send({ from: accounts[0] });

      console.log("Access granted successfully");
    } catch (error) {
      console.error("Error granting access:", error);
    }
  };

  const checkAccess = async () => {
    try {
      const access = await accessControl.methods
        .checkAccess(fileId, address)
        .call();

      setHasAccess(access);
      console.log("Access status:", access);
    } catch (error) {
      console.error("Error checking access:", error);
    }
  };

  return (
    <div>
      <h1>Access Control</h1>

      <h2>Grant Access</h2>
      <input
        type="text"
        placeholder="File ID"
        value={fileId}
        onChange={(e) => setFileId(e.target.value)}
      />
      <input
        type="text"
        placeholder="User Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={grantAccess}>Grant Access</button>

      <h2>Check Access</h2>
      <button onClick={checkAccess}>Check Access</button>
      <div>
        <strong>Has Access:</strong> {hasAccess ? "Yes" : "No"}
      </div>
    </div>
  );
}

export default AccessControl;