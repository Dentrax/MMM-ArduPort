'use strict';
const NodeHelper = require('node_helper');

const {PythonShell} = require('python-shell');

var pythonStarted = false;

module.exports = NodeHelper.create({

    consolePrefix: '[MMM-ArduPort]:: ',

    start: function() {
        console.log(this.consolePrefix + "Starting node_helper for module [" + this.name + "]");
        this.initialized = false;
    },

    python_start: function () {
        const self = this;
        const pyshell = new PythonShell('modules/' + this.name + '/arduport/arduport.py', { mode: 'json', args: [JSON.stringify(this.config)]});

        pyshell.on('message', function (message) {
            if (message.hasOwnProperty('debug')){
                console.log(this.consolePrefix + "[" + self.name + "] " + message.debug);
            }
            if (message.hasOwnProperty('status')){
                console.log(message.status);
                self.sendSocketNotification('status', {action: "status", name: message.status.name, data: message.status.data});
            }
            if (message.hasOwnProperty('sensor')){
                if(self.initialized){
                    self.sendData(message);
                }
            }
        });
        pyshell.end(function (err) {
            if (err) throw err;
            console.log("[" + self.name + "] " + 'finished running...');
            self.sendSocketNotification('error', 'pyshell-throw');
        });
    },

    sendData: function(message){
		    const self = this;
        var value;
        for(var i in this.config.sensors){
            value = null;
            var sensor = this.config.sensors.find(x => x.name === message.sensor.name);
            if(sensor){
                value = message.sensor.data;
            } else {
                console.error(self.consolePrefix + 'Error: Incoming Sensor ' + this.config.sensors[i].name + ' not configured in config.js!');
            }
            sensor.value = value;
        }
        self.sendSocketNotification('sensor', this.config.sensors);
    },

    socketNotificationReceived: function(notification, payload) {
        var self = this;

        if (notification === 'CONFIG') {
			      this.config = payload;
		    } else if (notification === "INITIALIZE" && this.config !== null){
            this.python_start();
            self.sendSocketNotification('status', {action: "status", name: "initialized"});
            this.initialized = true;
		    }
    }
});
