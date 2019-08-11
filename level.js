var levelup = require('levelup')
var leveldown = require('leveldown')

var db = levelup(leveldown('./SFRX'));

var addChainParams = function(key, value){
  console.log("Chain Parameters Loading as follows key: "+key.toString()+" - version"+ value)
  db.put(key, value, function (err) {
    if (err) return console.log('Ooops!', err) // some kind of I/O error
  })
}

var getChainParams = function(hashKey){
  db.get(hashKey, function (err, value) {
    console.log("Chain Params "+value.toString());
  });
}

var getChainParamsByName = function(hashKey,paramName,cb){
  db.get(hashKey+":"+paramName, function (err, value) {
    if(err){
      console.log("err: "+err);
      cb("notfound");
    }else{
      console.log("Chain Param "+paramName+": "+value.toString());
      cb(value.toString());
    }
  });
}

module.exports = {
  addChainParams:addChainParams,
  getChainParams:getChainParams,
  getChainParamsByName:getChainParamsByName
}
