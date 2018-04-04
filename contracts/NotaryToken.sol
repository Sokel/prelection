pragma solidity ^0.4.18;


import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';


contract NotaryToken is StandardToken {

    string public name = "Notary token";

    string public symbol = "NOT";

    uint public decimals = 18;

    function NotaryToken(){
        totalSupply_ = 100 * 1e18;
        balances[msg.sender] = totalSupply();
    }
}
