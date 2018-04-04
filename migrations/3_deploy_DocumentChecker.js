var DocumentChecker = artifacts.require("./DocumentChecker.sol");
var NotaryToken = artifacts.require("./NotaryToken.sol");


module.exports = function(deployer) {
    deployer.deploy(DocumentChecker, NotaryToken.address);
};
