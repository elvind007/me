// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AccessControl.sol";

contract Project is AccessControl {
    uint256 private _projectIdCounter;

    struct ProjectInfo {
        string name;
        string description;
        address[] members;
        string ipfsHash;
    }

    mapping(uint256 => ProjectInfo) private _projects;
    mapping(uint256 => mapping(address => bool)) private _projectMembers;

    function createProject(string memory name, string memory description, string memory ipfsHash) public returns (uint256) {
        uint256 projectId = _projectIdCounter;
        _projects[projectId] = ProjectInfo(name, description, new address[](0), ipfsHash);
        _projectMembers[projectId][msg.sender] = true;
        _projects[projectId].members.push(msg.sender);
        _projectIdCounter++;
        return projectId;
    }

    function addMember(uint256 projectId, address member) public {
        require(_projectMembers[projectId][msg.sender], "Not a project member");
        _projectMembers[projectId][member] = true;
        _projects[projectId].members.push(member);
    }

    function removeMember(uint256 projectId, address member) public {
        require(_projectMembers[projectId][msg.sender], "Not a project member");
        require(member != msg.sender, "Cannot remove yourself");
        _projectMembers[projectId][member] = false;

        uint256 index;
        bool found;
        for (uint256 i = 0; i < _projects[projectId].members.length; i++) {
            if (_projects[projectId].members[i] == member) {
                index = i;
                found = true;
                break;
            }
        }

        if (found) {
            _projects[projectId].members[index] = _projects[projectId].members[_projects[projectId].members.length - 1];
            _projects[projectId].members.pop();
        }
    }

    function updateProjectInfo(uint256 projectId, string memory newName, string memory newDescription, string memory newIpfsHash) public {
        require(_projectMembers[projectId][msg.sender], "Not a project member");
        _projects[projectId].name = newName;
        _projects[projectId].description = newDescription;
        _projects[projectId].ipfsHash = newIpfsHash;
    }

    function getProjectInfo(uint256 projectId) public view returns (ProjectInfo memory) {
        return _projects[projectId];
    }

    function isProjectMember(uint256 projectId, address member) public view returns (bool) {
        return _projectMembers[projectId][member];
    }
}