const dematContract = artifacts.require("DematContract");

module.exports = function (deployer) {
  deployer.deploy(dematContract);
};
