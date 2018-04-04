var NotaryToken = artifacts.require("./NotaryToken.sol");

module.exports = function(deployer) {
    deployer.deploy(NotaryToken);
};
