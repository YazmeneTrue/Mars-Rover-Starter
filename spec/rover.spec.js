const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

    test("constructor sets position and default values for mode and generatorWatts", function(){
        const testPosition = 9999;
        const rover = new Rover(testPosition);
        expect(rover.position).toBe(testPosition);
        expect(rover.mode).toBe('NORMAL');
        expect(rover.generatorWatts).toBe(110);
      });
 
      test("response returned by receiveMessage contains the name of the message", function(){
        const rover = new Rover(999);
        const message = new Message('test Name', []);
        const response = rover.receiveMessage(message);
        expect(response.message).toContain('test Name');
    });

    test("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
        const messageName = 'Test Name';
        const testCommands = [new Command('command1','value1'),
                             new Command('command2','value2')]
        const message = new Message(messageName, testCommands);
        const rover = new Rover(999);
        const response = rover.receiveMessage(message);
        expect(response.results.length).toBe(2);
      });
      test("responds correctly to the status check command",function(){
        const messageName = 'Test Name';
        const testCommands = [new Command('STATUS_CHECK')];
        const message = new Message(messageName,testCommands);
        const rover = new Rover(87382098, 'NORMAL', 110);
        const response = rover.receiveMessage(message);

        expect(response.results[0].completed).toBe(true);
        expect(response.results[0].roverStatus.mode).toBe('NORMAL');
        expect(response.results[0].roverStatus.generatorWatts).toBe(110);
        expect(response.results[0].roverStatus.position).toBe(87382098);
      });
      test("responds with a false completed value when attempting to move in LOW_POWER mode",function(){
        const messageName = 'Test Name';
        const testCommands =  [new Command('LOW_POWER',999)];
        const message = new Message(messageName,testCommands);
        const rover = new Rover(111, 'LOW_POWER');
        const response = rover.receiveMessage(message);

        expect(response.results.length).toBe(1);
        expect(response.results[0].completed).toBe(false);
        expect(rover.position).toBe(111);
      });
      test("responds with the position for the move command",function(){
        const messageName = 'Test Name';
        const testCommands = [new Command('MOVE', 111)];
        const message = new Message(messageName, testCommands);
        const rover = new Rover(100);
        const response = rover.receiveMessage(message);
 
        expect(response.results[0].completed).toBe(true);
        expect(rover.position).toBe(111);
        

      })
});
