const fs = require('fs');
const ReindeerToken = artifacts.require('ReindeerToken.sol');

module.exports = function deployContracts(deployer) {
  deployer.deploy(ReindeerToken);
};
