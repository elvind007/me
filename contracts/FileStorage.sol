// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./AccessControl.sol";

contract FileStorage is ERC721, AccessControl {
    uint256 private _tokenIdCounter;

    struct FileInfo {
        string name;
        string ipfsHash;
        address owner;
    }

    mapping(uint256 => FileInfo) private _fileInfo;

    constructor() ERC721("FileStorage", "FST") {}

    function storeFile(string memory name, string memory ipfsHash) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _mint(msg.sender, tokenId);
        _fileInfo[tokenId] = FileInfo(name, ipfsHash, msg.sender);
        _tokenIdCounter++;
        return tokenId;
    }

    function getFileInfo(uint256 tokenId) public view returns (FileInfo memory) {
        return _fileInfo[tokenId];
    }

    function updateFileInfo(uint256 tokenId, string memory newName, string memory newIpfsHash) public {
        require(ownerOf(tokenId) == msg.sender || isAdmin(msg.sender), "Not authorized");
        _fileInfo[tokenId].name = newName;
        _fileInfo[tokenId].ipfsHash = newIpfsHash;
    }

    function deleteFile(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender || isAdmin(msg.sender), "Not authorized");
        _burn(tokenId);
        delete _fileInfo[tokenId];
    }

    function getFileHash(uint256 fileId) public view override returns (string memory) {
        return _fileInfo[fileId].ipfsHash;
    }
}