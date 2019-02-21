
const fs = require('fs');
var nodes = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));

var PaymentAgent = artifacts.require("./PaymentAgent.sol");
var util = require('../util.js');
var u = require('./test-utils.js');
let sender = u.getStashName(nodes, web3.eth.accounts[0]);
let nodesPseudoPub = u.removeMe(nodes, sender);
let keysPseudoPub = u.getValueFromAllNodes(nodesPseudoPub, 'constKey');

module.exports = (done) => {
  let paymentAgent = null;
  let currentNetwork = util.getCurrentNetwork(web3);
  

  PaymentAgent.deployed().then((instance) => {
    paymentAgent = instance;
    
    util.colorLog("Submitting clear queue for all Banks", currentNetwork);
    return paymentAgent.clearQueue(
				  {privateFor: keysPseudoPub}); //only to MAS
  }).then((result) => {
    util.colorLog("\tmined!, block: "+result.receipt.blockNumber+", tx hash: "+result.tx, currentNetwork);
    util.colorLog(JSON.stringify(result.logs), currentNetwork)
    util.colorLog("")

    done();
  }).catch((e) => {
    console.error(e);
    done();
  });
};



