const PEER = require('./peer.js');
const PEERS = new PEER.Peers();
const CRYPTO = require('crypto');
const SWARM = require('discovery-swarm');
const DEFAULTS = require('dat-swarm-defaults');
var BLKDB = require('./level.js');

var globalGenesisHash = "hallelujah";

var chainState = {};
var connSeq;

/////////////////////////////////////////////asynchronous peer connection engine
var getConnectionConfig = async function(ntwk){
  return new Promise(function(resolve, reject) {
    var callBackNodePersistence = function(npid){
      myLastSessionId = npid;
      console.log("my last session = "+myLastSessionId);
      if(myLastSessionId != "notfound"){

        chainState.nodePersistantId = myLastSessionId;
        console.log("node persistantce was already set ")
      }else{
        chainState.nodePersistantId = CRYPTO.randomBytes(32).toString();//need to verify nodepersistance id is okay as string
        BLKDB.addChainParams(globalGenesisHash+":nodePersistantId",chainState.nodePersistantId);
      }
      //network related connections
      const config = DEFAULTS({
        // peer-id
        id: chainState.nodePersistantId,
      })

      const ntwk = SWARM(config);
      resolve(ntwk);
    }
    BLKDB.getChainParamsByName(globalGenesisHash,'nodePersistantId',callBackNodePersistence);
  })
}

var cbReset = async function(){
  var sw = await getConnectionConfig(this);
  sw.join('my-tester-00101')
  sw.on('connection', (conn, info) => {

    const seq = connSeq
    const peerId = info.id.toString('hex');
    if(info.id != Buffer.from(chainState.nodePersistantId).toString('hex')){
      var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      var infoHost = info.host;
      if(!infoHost.match(ipformat)){
        infoHost = infoHost.split(":")[3];
      }
      if(PEERS.peers.find(o => o.id === peerId)){
        PEERS.peers.find(o => o.id === peerId).conn = conn;
        //then this peer is aleady in the line up
      }else if(PEERS.peers.find(o => o.ip === infoHost)){
        PEERS.peers.find(o => o.ip === infoHost).conn = conn;
      }else{
        console.log("peer connection at  "+infoHost+" with id "+peerId);
        var addingPeer = new PEER.Peer(peerId,infoHost,info.port);
        PEERS.peers.push(addingPeer)
        addingPeer.conn = conn;
      }

      console.log(PEERS.peers.length)
      //setTimeout(function(){console.log(getThree)},2000)
    }//end if info.id != Buffer...

  })

}
cbReset();

const getOne = new PEER.Peer('jeff','127.0.0.1','80');
PEERS.peers.push(getOne)
const getTwo = new PEER.Peer('jack','192.168.1.1','80');
PEERS.peers.push(getTwo)

getOne.increment();
console.log('get one counter = '+getOne.nonce);
getOne.increment();
console.log('get one counter = '+getOne.nonce);
getOne.increment();
console.log('get one counter = '+getOne.nonce);
getOne.increment();
console.log('get one counter = '+getOne.nonce);
console.log('get one counter = '+getOne.nonce);
console.log('get one counter = '+getOne.nonce);
console.log('get one counter = '+getOne.nonce);
console.log('get one counter = '+getOne.nonce);
for(i = 0;i < 1299; i++){
  getOne.increment();
}
console.log('get one counter = '+getOne.nonce);

//console.log(JSON.stringify(getOne))
console.log(JSON.stringify(getOne.conn) === "{}")

//getOne.conn = {"ip":"127.0.0.1"}
console.log("is there a connection on get one? "+(Object.entries(getOne.conn).length === 0 && getOne.conn.constructor === Object));

console.log(PEERS);
