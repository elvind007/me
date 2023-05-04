// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AccessControl.sol";

contract StudentGroup is AccessControl {
    uint256 private _groupIdCounter;

    struct Group {
        string name;
        address[] members;
        string ipfsHash;
    }

    mapping(uint256 => Group) private _groups;
    mapping(uint256 => mapping(address => bool)) private _groupMembers;

    function createGroup(string memory name, string memory ipfsHash) public returns (uint256) {
        uint256 groupId = _groupIdCounter;
        _groups[groupId] = Group(name, new address[](0), ipfsHash);
        _groupMembers[groupId][msg.sender] = true;
        _groups[groupId].members.push(msg.sender);
        _groupIdCounter++;
        return groupId;
    }

    function addGroupMember(uint256 groupId, address member) public {
        require(_groupMembers[groupId][msg.sender], "Not a group member");
        _groupMembers[groupId][member] = true;
        _groups[groupId].members.push(member);
    }

    function removeGroupMember(uint256 groupId, address member) public {
        require(_groupMembers[groupId][msg.sender], "Not a group member");
        require(member != msg.sender, "Cannot remove yourself");
        _groupMembers[groupId][member] = false;

        uint256 index;
        bool found;
        for (uint256 i = 0; i < _groups[groupId].members.length; i++) {
            if (_groups[groupId].members[i] == member) {
                index = i;
                found = true;
                break;
            }
        }

        if (found) {
            _groups[groupId].members[index] = _groups[groupId].members[_groups[groupId].members.length - 1];
            _groups[groupId].members.pop();
        }
    }

    function updateGroupName(uint256 groupId, string memory newName, string memory newIpfsHash) public {
        require(_groupMembers[groupId][msg.sender], "Not a group member");
        _groups[groupId].name = newName;
        _groups[groupId].ipfsHash = newIpfsHash;
    }

    function getGroupInfo(uint256 groupId) public view returns (Group memory) {
        return _groups[groupId];
    }

    function isGroupMember(uint256 groupId, address member) public view returns (bool) {
        return _groupMembers[groupId][member];
    }
}