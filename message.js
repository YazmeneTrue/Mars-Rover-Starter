class Message {
   constructor(name,commands=[]){
      this.name = name;
      this.commands = commands
      if(!name) {
         throw Error("Name required.")
      }
   }
}

module.exports = Message;