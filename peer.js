const sha256 = require('crypto-js/sha256');
const crypto = require('crypto');
const bitcoin  = require('bitcoinjs-lib');
const ecies = require('standard-ecies');
const BLAKE2s = require('./blake2s.js');

function decodeUTF8(s) {
  var i, d = unescape(encodeURIComponent(s)), b = new Uint8Array(d.length);
  for (i = 0; i < d.length; i++) b[i] = d.charCodeAt(i);
  return b;
}

var ReDuex = function(inputs){
  try {
    var h = new BLAKE2s(8, decodeUTF8(""));
  } catch (e) {
    console.log("Error: " + e);
  };
  h.update(decodeUTF8(inputs));
  var thishash = h.hexDigest().toString();
  try {
    var hh = new BLAKE2s(8, decodeUTF8(thishash));
  } catch (e) {
    alert("Error: " + e);
  };
  hh.update(decodeUTF8(inputs));
  var rehash = hh.hexDigest().toString();
  //log(thishash);
  return thishash+rehash;
}

var Peer = class Peer {
    //we can do an address validation and kick back false
    constructor(id, ip, port, timestamp = parseInt(new Date().getTime()/1000)){

        this.id = id;
        this.index = ReDuex(id);
        this.setIp = function(ip){
          var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
          if(ip.match(ipformat)){
            this.ip = ip;
          }else{
            this.ip = ip.split(":")[3];
          }
        };
        this.setIp(ip);
        this.port = port;
        this.nonce = 0;
        this.increment = function(){
          this.nonce+=1;
        };
        this.timestamp = timestamp;

        //connections
        this.conn = {};
        this.conn2 = {};

        //blockchain stats
        this.nodeType = 3;//starts at 3 read only 2 is api and 1 is miner
        this.longPeerNonce = 0;//where is this set
        this.longPeerTxHeight = 0;//long peer txheight pulled from txhasharray
        this.peerMaxHeight = 0;
        this.peerTxHeight = 0;
        this.peerChainStateHash = {};
        this.peerTxHeight = 0;
        this.peerOxHeight = 0;

        //ecdh
        var options = {
            hashName: 'sha256',
            hashLength: 32,
            macName: 'sha256',
            macLength: 32,
            curveName: 'secp256k1',
            symmetricCypherName: 'aes-256-ecb',
            iv: null, // iv is used in symmetric cipher, set null if cipher is in ECB mode.
            keyFormat: 'uncompressed',
            s1: null, // optional shared information1
            s2: null // optional shared information2
        };
        this.ecdh = crypto.createECDH(options.curveName);
        this.ecdh.generateKeys();
        this.keyPair = bitcoin.ECPair.makeRandom();


        /***
        var thisnode = {
          "index":indexOfThisNode,
          "id":id,
          "info":{"ip":nodeIP,"port":port,"chainlength":thisN.chain.length,"maxHeight":thisN.chain.length,"synchBlock":0},
          "ecdh":ecdh,
        };

        thisN.nodes.push(thisnode);
        ***/

    }

}

var Peers = class Peers {
  constructor(){
    this.peers = [];
  }
}

module.exports = {
  Peer:Peer,
  Peers:Peers
}
