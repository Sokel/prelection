pragma solidity ^0.4.18;


import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './NotaryToken.sol';

contract DocumentChecker is Ownable {

    bytes32 proof;

    NotaryToken token;

    modifier onlyChargeable(){
        require(token.transferFrom(msg.sender, this, 1e18));
        _;
    }

    function DocumentChecker(address _token){
        owner = msg.sender;
        token = NotaryToken(_token);
    }

    function overwriteProof(string _document) public onlyChargeable{
        proof = calculateProof(_document);
    }

    function writeProof(string _document) public onlyOwner {
        proof = calculateProof(_document);
    }

    function calculateProof(string _document) pure public returns (bytes32){
        return keccak256(_document);
    }

    function getProof() view returns (bytes32){
        return proof;
    }

}