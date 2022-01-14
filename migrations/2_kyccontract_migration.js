const KycContract = artifacts.require("KycContract");

module.exports = function (deployer) {
  deployer.deploy(KycContract);
};
