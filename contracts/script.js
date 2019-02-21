a = eth.accounts[0];
web3.eth.defaultAccount = a;

// abi and bytecode generated from simplestorage.sol:
// > solc0419 -o outdir --overwrite --bin --abi PaymentEmulator.sol
// From geth console, loadScript("testcontracts0419/PaymentEmulator.abi"), loadScript("testcontracts0419/PaymentEmulator.bin")
var abi = [{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"payments","outputs":[{"name":"txRef","type":"bytes32"},{"name":"sender","type":"bytes32"},{"name":"receiver","type":"bytes32"},{"name":"amount","type":"int256"},{"name":"state","type":"uint8"},{"name":"express","type":"int256"},{"name":"putInQueue","type":"bool"},{"name":"timestamp","type":"uint256"},{"name":"salt","type":"bytes16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"stashNames","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_stashName","type":"bytes32"}],"name":"getPosition","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"pmtIdx","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"wipeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_txRef","type":"bytes32"},{"name":"_sender","type":"bytes32"},{"name":"_receiver","type":"bytes32"},{"name":"_amount","type":"int256"},{"name":"_express","type":"int256"},{"name":"_putInQueue","type":"bool"},{"name":"_salt","type":"bytes16"}],"name":"submitPmt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_txRef","type":"bytes32"},{"name":"_stashName","type":"bytes32"},{"name":"_amount","type":"int256"}],"name":"pledge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isCentralBankNode","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getHistoryLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_stashName","type":"bytes32"}],"name":"getStashByName","outputs":[{"name":"addr","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_stashName","type":"bytes32"}],"name":"markStash","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_txRef","type":"bytes32"}],"name":"getPmtAmt","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"pledgeIdx","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_stashName","type":"bytes32"}],"name":"getBalance","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"pledges","outputs":[{"name":"txRef","type":"bytes32"},{"name":"stashName","type":"bytes32"},{"name":"amount","type":"int256"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"centralBank","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_stashName","type":"bytes32"}],"name":"createStash","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"current","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_stashName","type":"bytes32"}],"name":"setCentralBank","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"stashRegistry","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"txRef","type":"bytes32"},{"indexed":false,"name":"gridlocked","type":"bool"},{"indexed":false,"name":"confirmPmt","type":"bool"}],"name":"Payment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"success","type":"bool"}],"name":"StashCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"stashName","type":"bytes32"}],"name":"StashMarked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"txRef","type":"bytes32"},{"indexed":false,"name":"stashName","type":"bytes32"},{"indexed":false,"name":"amount","type":"int256"}],"name":"BalancePledged","type":"event"}];

var myContract = web3.eth.contract(abi);
// Node 5
var instance = myContract.new({from:web3.eth.accounts[0], data: bytecode, gas: 0x47b760, privateFor: ["9lAixDFZgXorIxNVjHcxSD76xih7IGZn6n1B7e8sbTg="]},
function(e, contract) {
	if (e) {
		console.log("err creating contract", e);
	} else {
		if (!contract.address) {
			console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
		} else {
			console.log("Contract mined! Address: " + contract.address);
			console.log(contract);
		}
	}
});
//> Contract mined! Address: 0x90d5666e30d961b7a1701fa1822842ccfad67d53

/* Node 5 */
instance.createStash("hello1", {from:web3.eth.accounts[0], gas: 0x47b760, privateFor: ["9lAixDFZgXorIxNVjHcxSD76xih7IGZn6n1B7e8sbTg="]});

> eth.pendingTransactions;

instance.markStash("hello1", {from:web3.eth.accounts[0], gas: 0x47b760, privateFor: ["9lAixDFZgXorIxNVjHcxSD76xih7IGZn6n1B7e8sbTg="]});

> eth.pendingTransactions;
> instance.getBalance("hello1");
42

instance.pledge("r001", "hello1", 46, {from:web3.eth.accounts[0], gas: 0x47b760, privateFor: ["9lAixDFZgXorIxNVjHcxSD76xih7IGZn6n1B7e8sbTg="]});

> eth.pendingTransactions;
> instance.getBalance("hello1");
88

/* from node 5
var abi = [...;
var address = "0x90d5666e30d961b7a1701fa1822842ccfad67d53";
var instance = eth.contract(abi).at(address);
instance.getBalance("hello1");
88

   from node X
var abi = [...;
var address = "0x90d5666e30d961b7a1701fa1822842ccfad67d53";
var instance = eth.contract(abi).at(address);
instance.getBalance("hello1");
0
*/

var stash = instance.createStash("hello2", {from:web3.eth.accounts[0], gas: 0x47b760, privateFor: ["QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="]}, function(e, child) {
	if (e) {
		console.log("err calling contract", e);
	} else {
                if (!child.address) {
			console.log("child transaction send: TransactionHash: " + child.transactionHash + " waiting to be mined...");
		} else {
			console.log("child Contract mined! Address: " + child.address);
			console.log(child);
		}
       }
});
// "0x1349F3e1B8D71eFfb47B840594Ff27dA7E603d17"
> var address = "0x1349F3e1B8D71eFfb47B840594Ff27dA7E603d17";
undefined
> var instance = eth.contract(abi).at(address);
undefined
> instance.getBalance("hello1");
28
> instance.markStash("hello1", {from:eth.accounts[0]});

var abiStash = [{"constant":false,"inputs":[{"name":"_crAmt","type":"int256"}],"name":"credit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bankName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isSolvent","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_dAmt","type":"int256"}],"name":"debit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPosition","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"mark","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dAmt","type":"int256"}],"name":"safe_debit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amt","type":"int256"}],"name":"dec_position","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amt","type":"int256"}],"name":"inc_position","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isControlled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_bankName","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

var binStash = "0x6060604052341561000f57600080fd5b6040516020806103908339810160405280805190602001909190505080600081600019169055505061034a806100466000396000f3006060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806304d4f624146100b457806312065fe0146100d757806327d35801146101005780635ce239501461013157806369c837431461015e5780637398ab18146101815780638c0d0c29146101aa5780638c1fdf82146101bf578063a08c5c2f146101e2578063abc7b72314610205578063d915562b14610228575b600080fd5b34156100bf57600080fd5b6100d56004808035906020019091905050610255565b005b34156100e257600080fd5b6100ea610268565b6040518082815260200191505060405180910390f35b341561010b57600080fd5b610113610272565b60405180826000191660001916815260200191505060405180910390f35b341561013c57600080fd5b610144610278565b604051808215151515815260200191505060405180910390f35b341561016957600080fd5b61017f6004808035906020019091905050610285565b005b341561018c57600080fd5b610194610298565b6040518082815260200191505060405180910390f35b34156101b557600080fd5b6101bd6102a2565b005b34156101ca57600080fd5b6101e060048080359060200190919050506102bf565b005b34156101ed57600080fd5b61020360048080359060200190919050506102e1565b005b341561021057600080fd5b61022660048080359060200190919050506102f4565b005b341561023357600080fd5b61023b610307565b604051808215151515815260200191505060405180910390f35b8060016000828254019250508190555050565b6000600154905090565b60005481565b6000806002541215905090565b8060016000828254039250508190555050565b6000600254905090565b6001600360006101000a81548160ff021916908315150217905550565b6001548113156102ce57600080fd5b8060016000828254039250508190555050565b8060026000828254039250508190555050565b8060026000828254019250508190555050565b6000600360009054906101000a900460ff169050905600a165627a7a723058201bd570cae530774e72b504fc813eb263401e9595a9f5c52b5b73d1da8d83f7040029";

var addrStash = instance.stashRegistry("hello1"); // "0x9298878fc774c3b879120eb0abaad0be5a89e88b"
var stash = eth.contract(abiStash).at(addrStash);

stash.credit(28, {from:web3.eth.accounts[0], privateFor: ["LzIK0Etb2TPYpz+DX63VX3CswIGrRCVNG//jTgWx1kw="]});

http://solidity.readthedocs.io/en/v0.4.21/contracts.html
https://github.com/jpmorganchase/quorum/issues?utf8=%E2%9C%93&q=factory
https://github.com/jpmorganchase/quorum/issues/345
https://github.com/jpmorganchase/quorum/issues/78

/*
Node 1
======
Contract transaction send: TransactionHash: 0xa5f26a120abfe336c908b0aa7635e574cace10c518efb2f79e03403c0f2ef3c9 waiting to be mined...
undefined
> Contract mined! Address: 0x1932c48b2bf8102ba33b4a6b545c32236e342f34
[object Object]
> var address = "0x1932c48b2bf8102ba33b4a6b545c32236e342f34";
undefined
> var private = eth.contract(abi).at(address);
undefined
> private.get();
42

Node 2
======
> var abi = [{"constant":true,"inputs":[],"name":"storedData","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"retVal","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"initVal","type":"uint256"}],"payable":false,"type":"constructor"}];
undefined
> 
> var address = "0x1932c48b2bf8102ba33b4a6b545c32236e342f34";
undefined
> var private = eth.contract(abi).at(address);
undefined
> private.get();
0

Node 7
======
...
> private.get();
0

Node 8
======
...
> private.get();
42

*/


/*
> Contract mined! Address: 0x1932c48b2bf8102ba33b4a6b545c32236e342f34
[object Object]

> var address = "^C
> var address = "0x1932c48b2bf8102ba33b4a6b545c32236e342f34"
undefined
> var private = eth.contract(abi).at(address);
undefined
> eth.pendingTransactions()l
(anonymous): Line 1:26 Unexpected identifier
> eth.pendingTransactions();
TypeError: 'pendingTransactions' is not a function
    at <anonymous>:1:1

> eth.pendingTransaction();
TypeError: 'pendingTransaction' is not a function
    at <anonymous>:1:1

> eth.pendingTransactions;
[]
> private.createStash("hello2", {from:web3.eth.accounts[0], gas: 0x47b760, privateFor: ["QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="]});
"0xfe77c76f90216eab3d44941a6b6ccd0e2d966191c845db471423278259b69eae"
> eth.pendingTransactions;

[]
> eth.pendingTransactions;

[]
> private.markStash("hello2", {from:web3.eth.accounts[0], gas: 0x47b760, privateFor: ["QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="]});
"0x57fccda10b40c9b89a3d6b0c91c591b1ed385b0378350e1e79bb8a5e663675e7"
> eth.pendingTransactions;

[]
> private.getBalance();

Error: Invalid number of arguments to Solidity function
    at web3.js:3130:20
    at web3.js:4041:15
    at web3.js:4057:5
    at web3.js:4098:19
    at apply (<native code>)
    at web3.js:4227:12
    at <anonymous>:1:1

> private.getBalance("hello2");
42

...
> private.pledge("r001", "hello3", 46, {from:web3.eth.accounts[0], gas: 0x47b760, privateFor: ["QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="]});
"0x585ecbdf35a2ae6df5890ca29f0909b840ec442a86d835e45025c9da0e6cb107"
> eth.pendingTransactions;

[]
> private.getBalance("hello3");

88

*/
