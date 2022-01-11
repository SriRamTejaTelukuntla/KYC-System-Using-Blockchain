const kycContract = artifacts.require("kycContract");

module.exports = function (deployer) {
  deployer.deploy(kycContract);
};
