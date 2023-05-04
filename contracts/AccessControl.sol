pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AccessControl is Ownable {
    mapping(address => bool) private _admins;
    mapping(uint256 => string) public fileHashes;
    uint256 private fileCounter;

    event AdminAdded(address indexed account);
    event AdminRemoved(address indexed account);
    event FileHashAdded(uint256 indexed fileId, string ipfsHash);

    modifier onlyAdmin() {
        require(isAdmin(msg.sender), "AccessControl: caller is not an admin");
        _;
    }

    constructor() {
        fileCounter = 0;
    }

    function isAdmin(address account) public view returns (bool) {
        return _admins[account];
    }

    function addAdmin(address account) public onlyOwner {
        _addAdmin(account);
    }

    function removeAdmin(address account) public onlyOwner {
        _removeAdmin(account);
    }

    function _addAdmin(address account) internal {
        _admins[account] = true;
        emit AdminAdded(account);
    }

    function _removeAdmin(address account) internal {
        _admins[account] = false;
        emit AdminRemoved(account);
    }

    function addFileHash(string memory ipfsHash) public onlyAdmin returns (uint256) {
        uint256 currentFileId = fileCounter;
        fileHashes[currentFileId] = ipfsHash;
        fileCounter++;
        emit FileHashAdded(currentFileId, ipfsHash);
        return currentFileId;
    }

    function getFileHash(uint256 fileId) public view virtual returns (string memory) {
        return fileHashes[fileId];
    }
}