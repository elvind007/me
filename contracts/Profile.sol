// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Profile {
    struct UserProfile {
        string name;
        string email;
    }

    mapping(address => UserProfile) private _userProfiles;

    function createUserProfile(string memory name, string memory email) public {
        _userProfiles[msg.sender] = UserProfile(name, email);
    }

    function getUserProfile(address userAddress) public view returns (UserProfile memory) {
        return _userProfiles[userAddress];
    }
}