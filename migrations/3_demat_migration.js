const DematContract = artifacts.require("DematContract");

module.exports = function (deployer) {
  deployer.deploy(DematContract);
};
