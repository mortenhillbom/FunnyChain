const express = require('express')
const app = express()
const port = 3000


var Web3 = require('web3');
require('ethereum-web3-plus');
var util = require('ethereumjs-util');
var tx = require('ethereumjs-tx');
var lightwallet = require('eth-lightwallet');
var txutils = lightwallet.txutils;
web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/JxSDkefPqCeOZDze5gyB'));

var address = '0xE0be1Ef7486E4AFa50A7a479F9Da41acf137A461';
var key = '1a0bc92def700891e9c986e90af39b022488cfef8f0487aeb1f79e6b10412cf0';


console.log(web3.version);
console.log(web3.currentProvider);
console.log(web3.eth.accounts);


function sendRaw(rawTx) {
    var privateKey = new Buffer(key, 'hex');
    var transaction = new tx(rawTx);
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');
    web3.eth.sendRawTransaction(
    '0x' + serializedTx, function(err, result) {
        if(err) {
            console.log(err);
        } else {
        	console.log('result: ');
            console.log(result);
        }
    });
}

function makeMeme(memeString) {
	// MAKE MEME
	var txOptions = {
	    nonce: web3.toHex(web3.eth.getTransactionCount(address)),
	    gasLimit: web3.toHex(800000),
	    gasPrice: web3.toHex(20000000000),
	    to: contractAddress
	}
	var rawTx = txutils.functionTx(interface, 'newMeme', [memeString], txOptions);
	sendRaw(rawTx);
}

function likeMeme(memeId) {
	// MAKE MEME
	var txOptions = {
	    nonce: web3.toHex(web3.eth.getTransactionCount(address)),
	    gasLimit: web3.toHex(800000),
	    gasPrice: web3.toHex(20000000000),
	    to: contractAddress
	}
	var rawTx = txutils.functionTx(interface, 'likeMeme', [memeId], txOptions);
	sendRaw(rawTx);
}

var interface = [ { "constant": false, "inputs": [ { "name": "_username", "type": "string" }, { "name": "_password", "type": "string" } ], "name": "registerUser", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balances", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "users", "outputs": [ { "name": "user", "type": "address", "value": "0xa070abc3c57a74e40ef492224684e206e5220e93" }, { "name": "username", "type": "string", "value": "Im_stupid" }, { "name": "password", "type": "string", "value": "hello" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "memes", "outputs": [ { "name": "memeId", "type": "uint256", "value": "0" }, { "name": "url", "type": "string", "value": "http://www.funnybeing.com/wp-content/uploads/2016/09/Be-Friend-With-Stupid-Person-600x613.jpg" }, { "name": "creator", "type": "address", "value": "0xa070abc3c57a74e40ef492224684e206e5220e93" }, { "name": "likes", "type": "uint256", "value": "1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "memeCount", "outputs": [ { "name": "", "type": "uint256", "value": "1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "likes", "outputs": [ { "name": "likeId", "type": "uint256", "value": "0" }, { "name": "memeId", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "contractBalance", "outputs": [ { "name": "", "type": "uint256", "value": "100000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0xe0be1ef7486e4afa50a7a479f9da41acf137a461" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "transactions", "outputs": [ { "name": "receiver", "type": "address", "value": "0x" }, { "name": "amount", "type": "uint256", "value": "0" }, { "name": "timestamp", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_memeId", "type": "uint256" } ], "name": "likeMeme", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "previousPayoutLikeIndex", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_url", "type": "string" } ], "name": "newMeme", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "payCreators", "outputs": [ { "name": "success", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" } ];
var contractAddress = '0x8DacfBbA179b60065DA39E2645d0BC5B61577A88';




app.get('/makememe', (request, response) => {
	makeMeme(request.query.memeString);
  	response.send('You maybe made a meme!')
})

app.get('/likememe', (request, response) => {
	makeMeme(parseInt(request.query.memeId, 10));
  	response.send('You maybe liked a meme!')
})



app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})



//var MemesContract = web3.eth.contract(interface);

//var memes = MemesContract.at(contractAddress);

//var memeId = memes.newMeme('Funny joke haha', {value: 0, gas: 200000});
//console.log(memeId);

//console.log(web3.toDecimal(web3.toHex(web3.eth.getBalance(memes.address))));