var config = require('./sw4ttt_modules/confighelper');

var events = require('events');
var eventEmitter = new events.EventEmitter();

// Bind the connection event with the listner1 function
eventEmitter.on('datarow', function(row) {
    console.log('listner1 executed.');
    console.log(row);
});
//eventEmitter.emit('connection');

config.initConfig();
config.getConfigData(eventEmitter);