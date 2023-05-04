import React, { useState } from 'react';
import { create as IPFS } from "ipfs-http-client";
import './StudentGroup.css';

const ipfs = IPFS.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const StudentGroup = ({ web3, accounts, studentGroupContract }) => {
  const [buffer, setBuffer] = useState(null);
  const [fileHash, setFileHash] = useState('');

  const captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer.from(reader.result));
    };
  };

  const addFileToIPFS = async () => {
    try {
      const result = await ipfs.add(buffer);
      console.log('IPFS result', result);
      setFileHash(result.path);
      // Here you can interact with your smart contract to store the IPFS hash
      // For example: await studentGroupContract.methods.storeFileHash(result.path).send({ from: accounts[0] });
    } catch (error) {
      console.error('Error adding file to IPFS:', error);
    }
  };

  const getFileFromIPFS = async () => {
    try {
      // Retrieve the file hash from your smart contract
      // For example: const storedFileHash = await studentGroupContract.methods.getFileHash().call();
      // Replace the example hash below with the retrieved hash
      const storedFileHash = 'QmExampleHash';
      const stream = ipfs.cat(storedFileHash);
      let data = '';

      for await (const chunk of stream) {
        data += new TextDecoder().decode(chunk);
      }

      console.log('IPFS data:', data);
    } catch (error) {
      console.error('Error fetching file from IPFS:', error);
    }
  };

  return (
    <div className="container">
      <h1>Student Group</h1>
      <input type="file" onChange={captureFile} />
      <button onClick={addFileToIPFS}>Upload to IPFS</button>
      <button onClick={getFileFromIPFS}>Get file from IPFS</button>
      {fileHash && <p>IPFS Hash: {fileHash}</p>}
    </div>
  );
};

export default StudentGroup;