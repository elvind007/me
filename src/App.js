import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import getWeb3 from "./getWeb3";
import { getContractInstance } from "./utils";

import AccessControl from "./components/AccessControl";
import FileStorage from "./components/FileStorage";
import StudentGroup from "./components/StudentGroup";
import GlobalFileSharing from "./components/GlobalFileSharing";
import ProjectManager from "./components/ProjectManager";

import "./App.css";
import "./components/AccessControl.css";
import "./components/FileStorage.css";
import "./components/StudentGroup.css";
import "./components/GlobalFileSharing.css";
import "./components/ProjectManager.css";

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contracts, setContracts] = useState({});

  useEffect(() => {
    const init = async () => {
      try {
        const Web3 = await getWeb3();
        const accounts = await Web3.eth.getAccounts();

        const AccessControl = await getContractInstance("AccessControl");
        const FileStorage = await getContractInstance("FileStorage");
        const StudentGroup = await getContractInstance("StudentGroup");
        const GlobalFileSharing = await getContractInstance("GlobalFileSharing");
        const ProjectManager = await getContractInstance("ProjectManager");

        setWeb3(Web3);
        setAccounts(accounts);
        setContracts({
          AccessControl,
          FileStorage,
          StudentGroup,
          GlobalFileSharing,
          ProjectManager,
        });
      } catch (error) {
        alert("Failed to load web3, accounts, or contracts. Check console for details.");
        console.error(error);
      }
    };

    init();
  }, []);

  if (!web3) {
    return <div>Loading Web3, accounts, and contracts...</div>;
  }

  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <h1>MetaDOS</h1>
            <ul>
              <li>
                <Link to="/accesscontrol">Access Control</Link>
              </li>
              <li>
                <Link to="/filestorage">File Storage</Link>
              </li>
              <li>
                <Link to="/studentgroup">Student Group</Link>
              </li>
              <li>
                <Link to="/projectmanager">Project Manager</Link>
              </li>
              <li>
                <Link to="/globalfilesharing">Global File Sharing</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/accesscontrol">
              <AccessControl web3={web3} accounts={accounts} contracts={contracts} />
            </Route>
            <Route path="/filestorage">
              <FileStorage web3={web3} accounts={accounts} contracts={contracts} />
            </Route>
            <Route path="/studentgroup">
              <StudentGroup web3={web3} accounts={accounts} contracts={contracts} />
            </Route>
            <Route path="/globalfilesharing">
              <GlobalFileSharing web3={web3} accounts={accounts} contracts={contracts} />
            </Route>
            <Route path="/projectmanager">
              <ProjectManager web3={web3} accounts={accounts} contracts={contracts} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;