class Rover {
   constructor(position, mode = 'NORMAL', generatorWatts = 110) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }
 
   receiveMessage(message) {
      const results = message.commands.map(command => {
         if (command.commandType === 'STATUS_CHECK') {
            return {
               completed: true,
               roverStatus: {
                  position: this.position,
                  mode: this.mode,
                  generatorWatts: this.generatorWatts
               }
            };
         } else if (command.commandType === 'MODE_CHANGE') {
            this.mode = command.value;
            return { completed: true };
         } else if (command.commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
               return { completed: false };
            } else {
               this.position = command.value;
               return { completed: true };
            }
         } else {
            return { completed: false };
         }
      });
 
      return {
         message: message.name,
         results: results
      };
   }
}

module.exports = Rover;