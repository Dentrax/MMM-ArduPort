Module.register("MMM-ArduPort", {

    logPrefix: '[MMM-ArduPort]:: ',

    defaults: {
        portname: "/dev/ttyUSB0",
        updateInterval: 1, //second
		    animationSpeed: 1000,
        displayIcons: true,
	      iconSize: 'small',
		    labelSize: 'medium',
        showDescription: true,
        useColors: true,
        sensor: {
            description: null,
            valuePrefix: null,
            valuePostfix: null,
            highestValue: null,
            highValue: null,
            lowValue: null,
            lowestValue: null,
            error: null
        },
        developerMode: false
    },

    start: function() {
		    Log.info('Starting module: ' + this.name);

        const self = this;

        this.loading = true;
        this.isArduinoStarting = false;
        this.isArduinoStarted = false;
        this.isArduinoConnected = false;

		    this.sendSocketNotification('CONFIG', this.config);
		    this.sendSocketNotification('INITIALIZE', null);

		    self.log(("[MMM-ArduPort::START()]: data: " + JSON.stringify(self.data, null, 4)), "dev");
		    self.log(("[MMM-ArduPort::START()]: config: " + JSON.stringify(self.config, null, 4)), "dev");
	  },

    getTranslations: function() {
		    return {
			      en: "translations/en.json"
		    };
	  },

    getStyles: function() {
		    return [
            'https://use.fontawesome.com/releases/v5.6.3/css/all.css',
            'MMM-ArduPort.css'
        ];
	  },

    socketNotificationReceived: function(notification, payload) {
        const self = this;

        self.log(notification);
        self.log(JSON.stringify(payload, null, 4));
        switch(notification){

        case 'status':
            if(payload.name == 'setup'){
                if(payload.data == 'starting'){
                    self.log("[socketNotificationReceived::status]: starting");
                    this.isArduinoStarting = true;
                } else if (payload.data == 'started'){
                    self.log("[socketNotificationReceived::status]: started");
                    this.isArduinoStarting = false;
                    this.isArduinoStarted = true;
                }
            }
            if(payload.name == 'connect'){
                if(payload.data == 'connected'){
                    self.log("[socketNotificationReceived::status]: connected");
                    this.isArduinoConnected = true;
                    this.sendNotification("SHOW_ALERT", {type: "notification", imageFA: 'fa-microchip', title: self.translate("ARDUINO_CONNECTED")});
                } else if(payload.data == 'disconnected'){
                    self.log("[socketNotificationReceived::status]: disconnected");
                    this.isArduinoConnected = false;
                    this.sendNotification("SHOW_ALERT", {type: "notification", imageFA: 'fa-microchip', title: self.translate("ARDUINO_DISCONNECTED")});
                }
            }
            if(payload.name == 'initialized'){
                this.loading = false;
            }
            self.updateDom(self.config.animationSpeed);
            break;

        case 'sensor':
            if(this.isArduinoConnected && this.isArduinoStarted){
                self.log("[socketNotificationReceived::sensor]: ");
                self.log(JSON.stringify(payload, null, 4));

                this.message = null;
                this.config.sensors = payload;

                self.updateDom(self.config.animationSpeed);
            }
            break;

        case 'error':
            console.log("[socketNotificationReceived::error]:");

            if(payload == 'pyshell-throw'){
                this.message = 'Error : PyShell down!';
                this.isArduinoConnected = false;
                this.isArduinoStarted = false;
            }

            self.updateDom(self.config.animationSpeed);
            break;
        }
    },

    formatValue: function(value, sensor) {
        var self = this;

        var val = document.createElement("span");
        val.classList.add("port-data");

        if (value != null) {
            val.innerHTML = "({0}) ".format(value);

            if (this.config.useColors){
                if (value <= sensor.maxValue && value >= sensor.minValue) {
                    if (value <= sensor.maxValue){
                        val.innerHTML += "MAXIMUM";
                        val.classList.add("value-max");
                    } else if (value >= sensor.highestValue){
                        val.innerHTML += "CRITICAL";
                        val.classList.add("value-highest");
                    } else if (value >= sensor.highValue){
                        val.innerHTML += "EMERGENCY";
                        val.classList.add("value-high");
                    } else if (value >= sensor.lowValue){
                        val.innerHTML += "OK";
                        val.classList.add("value-low");
                    } else if (value >= sensor.lowestValue){
                        val.innerHTML += "OK";
                        val.classList.add("value-lowest");
                    } else if (value >= sensor.minValue){
                        val.innerHTML += "OK";
                        val.classList.add("value-min");
                    }
                }
            }
        } else {
            val.innerHTML = self.translate("ARDUINO_WAITING_DATA");
            val.classList.add("value-waiting");
        }


        return val;
    },

    getSensorIcon: function(sensor) {

    },

    getDom: function() {
        var self = this;

        var wrapper = document.createElement("div");

        if (self.loading) {
            var loading = document.createElement("div");
				    loading.innerHTML += self.translate("LOADING");
            loading.className = "dimmed light small";
            wrapper.appendChild(loading);
				    return wrapper;
			  } else if (!self.isArduinoConnected) {
            var waiting = document.createElement("div");
				    waiting.innerHTML += self.translate("ARDUINO_WAITING_CONNECTION");
				    waiting.classList.add("waiting");
				    waiting.classList.add("small");
            wrapper.appendChild(waiting);
				    return wrapper;
			  } else if (self.isArduinoStarting) {
            var starting = document.createElement("div");
				    starting.innerHTML += self.translate("ARDUINO_STARTING");
				    starting.classList.add("starting");
				    starting.classList.add("small");
            wrapper.appendChild(starting);
				    return wrapper;
        }

        if (self.isArduinoStarted) {
            for(var s in this.config.sensors){
                sensor = this.config.sensors[s];

                var row = document.createElement("div");
                row.classList.add("row");

                var name = document.createElement("span");
                name.className = "name-label bright";
                name.innerHTML = sensor.name;
                row.appendChild(name);

                if (sensor.error) {
                    var errorTxt = document.createElement("span");
                    errorTxt.classList.add("sensor-error");
                    errorTxt.innerHTML = "Error";
                    row.appendChild(errorTxt);
                } else {
                    row.appendChild(this.formatValue(sensor.value, sensor));

                    if (this.config.showDescription) {
                        var description = document.createElement("div");
                        description.classList.add("sensor-description");

                        description.innerHTML = sensor.description;
                        row.appendChild(description);
                    }
                }

                wrapper.appendChild(row);
            }

		        return wrapper;
        }

    },

    log: function(message, type) {
		    var self = this;
		    if (self.config.developerMode) {
			      var date = new Date();
			      var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
			      message = self.name + ": (" + self.data.index + ")(" + time + ") " + message;
		    } else { message = self.name + ": " + message; }
		    switch (type) {
			  case "error": Log.error(this.logPrefix + message); break;
			  case "warn": Log.warn(this.logPrefix + message); break;
			  case "info": Log.info(this.logPrefix + message); break;
			  case "dev": if (self.config.developerMode) { Log.log(this.logPrefix + message); } break;
			  default: Log.log(this.logPrefix + message);
		    }
	  }
});
