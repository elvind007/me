import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import ProjectAbi from "../abis/Project.json";
import './TeamCollaborator.css';
function TeamCollaborator() {
  const [web3, setWeb3] = useState(null);
  const [project, setProject] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [inviteeAddress, setInviteeAddress] = useState("");
  const [fileId, setFileId] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
  try {
    const web3Instance = await getWeb3();
    const networkId = await web3Instance.eth.net.getId();
    const deployedNetwork = ProjectAbi.networks[networkId];
    const instance = new web3Instance.eth.Contract(
      ProjectAbi.abi,
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

  const createProject = async () => {
    const accounts = await web3.eth.getAccounts();

    try {
      const receipt = await project.methods
        .createProject(projectName)
        .send({ from: accounts[0] });

      const newProjectId = receipt.events.ProjectCreated.returnValues.projectId;
      console.log("Project created successfully with ID:", newProjectId);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const inviteUser = async () => {
    const accounts = await web3.eth.getAccounts();

    try {
      await project.methods
        .inviteUser(projectId, inviteeAddress)
        .send({ from: accounts[0] });
      console.log("User invited successfully");
    } catch (error) {
      console.error("Error inviting user:", error);
    }
  };

  const addFile = async () => {
    const accounts = await web3.eth.getAccounts();

    try {
      await project.methods
        .addFile(projectId, fileId, ipfsHash)
        .send({ from: accounts[0] });
      console.log("File added successfully");
    } catch (error) {
      console.error("Error adding file:", error);
    }
  };

  return (
    <div>
      <h1>Team Collaborator</h1>

      <h2>Create Project</h2>
      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button onClick={createProject}>Create Project</button>

      <h2>Invite User to Project</h2>
      <input
        type="text"
        placeholder="Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Invitee Address"
        value={inviteeAddress}
        onChange={(e) => setInviteeAddress(e.target.value)}
      />
      <button onClick={inviteUser}>Invite User</button>

      <h2>Add File to Project</h2>
      <input
        type="text"
        placeholder="File ID"
        value={fileId}
        onChange={(e) => setFileId(e.target.value)}
      />
      <input
        type="text"
        placeholder="IPFS Hash"
        value={ipfsHash}
        onChange={(e) => setIpfsHash(e.target.value)}
      />
      <button onClick={addFile}>Add File</button>
    </div>
  );
}

export default TeamCollaborator;