var Ommer = class Ommer{
    //we can do an address validation and kick back false
    constructor(name, timestamp = Date.now()){

        console.log("OMMER IS BEING CREATED "+this.timestamp+this.previousHash+this.nonce);

        this.name = name,
        this.timestamp = timestamp;
        this.counter = 0;
        this.increment = function(){
          this.counter+=1;
        }

    }
}

module.exports = Ommer
