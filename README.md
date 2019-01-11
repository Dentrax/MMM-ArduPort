# MMM-ArduPort
This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/tree/develop) smart mirror project.

This module provides Arduino serial communication support with Raspberry PI.

| Status  | Version | Date       | Maintained? | Minimum MagicMirror² Version |
|:------- |:------- |:---------- |:----------- |:---------------------------- |
| Working | `1.0.0` | 2019-01-11 | Yes         |`2.0.0`                       |

## Screenshots

![MMM-ArduPort Running](screenshots/mmmarduport_running.png?raw=true "Screenshot")

![MMM-ArduPort Running](screenshots/mmmarduport_waiting-module.png?raw=true "Screenshot")

![MMM-ArduPort Running](screenshots/mmmarduport_waiting-arduino.png?raw=true "Screenshot")

![MMM-ArduPort Running](screenshots/mmmarduport_starting.png?raw=true "Screenshot")

## Dependencies

- [python-shell](https://www.npmjs.com/package/python-shell)

## Installation

To install the module, use your terminal to:

1. Navigate to your MagicMirror's `modules` folder. If you are using the default installation directory, use the command: 
```
cd ~/MagicMirror/modules
```

2. Clone the module to your computer by executing the following command:
```
git clone https://github.com/glitch452/MMM-LocalTemperature.git
```

3. Install the `python-shell` library by executing the following command:
```
npm install
```

* Configure the module in your `config.js` file.

## Using the module

### MagicMirror² Configuration

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        ...
        {
            module: "MMM-ArduPort",
            position: "bottom_right",
            header: "MMM-ArduPort",
            config: {
                // See below for more Configuration Options
            }
        },
        ...
    ]
}
```
### Configuration Options

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
      <th>Value</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>portname</code></td>
      <td><strong>REQUIRED</strong><br>The port name to which the Arduino will be connected<br><br><strong>Example:</strong> <code>"/dev/ttyUSB0"</code></td>
      <td>string</td>
      <td><code>NULL</code></td>
    </tr>
    <tr>
      <td><code>displayIcons</code></td>
      <td>Shows specific icons of the sensors<br><br></td>
      <td>boolean</td>
      <td><code>NULL</code></td>
    </tr>
    <tr>
      <td><code>showDescription</code></td>
      <td>Shows the descriptions of the sensors<br></td>
      <td>boolean</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>hideLoading</code></td>
      <td>Hide loding animation<br></td>
      <td>boolean</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>hideWaiting</code></td>
      <td>Hide waiting animation if the sensor did not send any data yet<br></td>
      <td>boolean</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>useColors</code></td>
      <td>Use colorful texts<br></td>
      <td>boolean</td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td><code>sensors</code></td>
      <td><strong>REQUIRED</strong><br>Sensor array to be used in the module<br><br></td>
      <td>array</td>
      <td><code>NULL</code></td>
    </tr>
  </tbody>
</table>

Each object in the `sensors` array can have the following parameters:

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
      <th>Values</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td><strong>REQUIRED</strong><br>The name of the sensor (case-sensitive, no space)<br><br><strong>Example:</strong> <code>"HCSR04"</code></td>
      <td>string</td>
      <td><code>NULL</code></td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>If <code>showDescription</code> = <code>true</code> description shown under the sensor<br><br><strong>Example:</strong> <code>"My awesome description"</code></td>
      <td>string</td>
      <td><code>NULL</code></td>
    </tr>
    <tr>
      <td><code>maxValue</code></td>
      <td>MAXIMUM value that the sensor can produce<br><br></td>
      <td>integer</td>
      <td><code>NULL</code></td>
    </tr>
    <tr>
      <td><code>maxFormat</code></td>
      <td>To format the string shown on the screen<br><br><strong>Example:</strong> <code>({0}) MAX</code></td>
      <td>string</td>
      <td><code>NULL</code></td>
    </tr>
    <tr>
      <td><code>highestValue</code></td>
      <td>HIGHEST value that the sensor can produce<br><br></td>
      <td>integer</td>
      <td><code>NULL</code></td>
    </tr>
    <tr>
      <td><code>highestFormat</code></td>
      <td>To format the string shown on the screen<br><br><strong>Example:</strong> <code>({0}) HIGHEST</code></td>
      <td>string</td>
      <td><code>NULL</code></td>
    </tr>
    <tr>
      <td><code>highValue</code></td>
      <td>HIGH value that the sensor can produce<br><br></td>
      <td>integer</td>
      <td><code>NULL</code></td>
    </tr>
    <tr>
      <td><code>highFormat</code></td>
      <td>To format the string shown on the screen<br><br><strong>Example:</strong> <code>({0}) HIGH</code></td>
      <td>string</td>
      <td><code>NULL</code></td>
    </tr>
    <tr>
      <td><code>lowValue</code></td>
      <td>LOW value that the sensor can produce<br><br></td>
      <td>integer</td>
      <td><code>NULL</code></td>
    </tr>
    <tr>
      <td><code>lowFormat</code></td>
      <td>To format the string shown on the screen<br><br><strong>Example:</strong> <code>({0}) LOW</code></td>
      <td>string</td>
      <td><code>NULL</code></td>
    </tr>
    <tr>
      <td><code>lowestValue</code></td>
      <td>LOWEST value that the sensor can produce<br><br></td>
      <td>integer</td>
      <td><code>NULL</code></td>
    </tr>
    <tr>
      <td><code>lowestFormat</code></td>
      <td>To format the string shown on the screen<br><br><strong>Example:</strong> <code>({0}) LOWEST</code></td>
      <td>string</td>
      <td><code>NULL</code></td>
    </tr>
    <tr>
      <td><code>minValue</code></td>
      <td>MINIMUM value that the sensor can produce<br><br></td>
      <td>integer</td>
      <td><code>NULL</code></td>
    </tr>
    <tr>
      <td><code>minFormat</code></td>
      <td>To format the string shown on the screen<br><br><strong>Example:</strong> <code>({0}) MIN</code></td>
      <td>string</td>
      <td><code>NULL</code></td>
    </tr>
  </tbody>
</table>

Here is an example of an entry in `config.js` with full-feature.

```
...
        {
	          module: 'MMM-ArduPort',
	          position: 'bottom_left',
              header: 'Arduino Sensors',
              config: {
                portname: "/dev/ttyUSB0",
                updateInterval: 1,
                animationSpeed: 1000,
                displayIcons: true,
                showDescription: true,
                hideLoading: false,
                hideWaiting: false,
                useColors: true,
                sensors: [
                    {
                        name: "MQ2",
                        description: "LPG, Propane, Hydrogen",
                        maxValue: 50,
                        maxFormat: "({0} ppm) MAXIMUM",
                        highestValue: 30,
                        highestFormat: "({0} ppm) CRITICAL",
                        highValue: 15,
                        highFormat: "({0} ppm) EMERGENCY",
                        lowValue: 10,
                        lowFormat: "({0} ppm) LOW",
                        lowestValue: 5,
                        lowestFormat: "({0} ppm) VERY LOW",
                        minValue: 0,
                        minFormat: "({0} ppm) OK"
                    },
                    {
                        name: "LM35",
                        description: "Temperature",
                        maxValue: 50,
                        maxFormat: "({0}°C) VERY HIGH",
                        highestValue: 30,
                        highestFormat: "({0}°C) HIGH",
                        highValue: 15,
                        highFormat: "({0}°C) NORMAL",
                        lowValue: 10,
                        lowFormat: "({0}°C) LOW",
                        lowestValue: 5,
                        lowestFormat: "({0}°C) VERY LOW",
                        minValue: 0,
                        minFormat: "({0}°C) OK"
                    },
                    {
                        name: "HCSR04",
                        description: "Distance",
                        maxValue: 50,
                        maxFormat: "({0} cm) TOO FAR",
                        highestValue: 30,
                        highestFormat: "({0} cm) FAR",
                        highValue: 15,
                        highFormat: "({0} cm) NORMAL",
                        lowValue: 10,
                        lowFormat: "({0} cm) CLOSE",
                        lowestValue: 5,
                        lowestFormat: "({0} cm) TOO CLOSE",
                        minValue: 0,
                        minFormat: "({0} cm) OK"
                    },
                ]
            }
        },
...
```

## Using the Arduino

To communicate between `Arduino` and `MMM-ArduPort`, serial communication must be in this format:

```
Serial.println("[COMMAND:NAME:DATA]")
```

### Starting the module

**IMPORTANT:*** Do not any send sensor data in the `setup()` function.

In order to start the module, the Arduino's `setup()` function must be completed.

- To send `starting` signal: `[status:setup:starting]`

- To send `started` signal: `[status:setup:started]`

- To send `failed` signal: `[status:setup:failed]**

**Example:**

```
Serial.println("[status:setup:starting]");
Serial.println("[status:setup:failed]");
Serial.println("[status:setup:started]");
```

### Sending data to module

**IMPORTANT:** The signal command you send must be registered as name in the `sensors*** array.

**Example***
```
                sensors: [
                    {
                        name: "MQ2",
                    },
                    {
                        name: "LM35",
                    },
                    {
                        name: "HCSR04",
                    },
```

To transmit a sensor data to the module: `[sensor:SENSOR_NAME:SENSOR_VALUE]**

**Example:**

```
Serial.println("[sensor:MQ2:19]");
Serial.println("[sensor:LM35:11]");
Serial.println("[sensor:HCSR04:64]");
```

### Full Arduino Example

```
volatile int32_t m_counter = 0;
bool WasStarted = false;

static const char *pcMQ2Prefix = "[sensor:MQ2:";
static const char *pcLM35Prefix = "[sensor:LM35:";
static const char *pcHCSR04Prefix = "[sensor:HCSR04:";
static const char *pcPostfix = "]";

void setup() {
  Serial.begin(9600);
  while(!Serial);
  
  Serial.println("[status:setup:starting]");
  
  int test = 1;
  m_counter = test;

  if(test > 1) {
    WasStarted = false;
    Serial.println("[status:setup:failed]");
    return;
  }
  
  delay(3000);
  WasStarted = true;
  Serial.println("[status:setup:started]");
  delay(100);
}

void loop() {
  Serial.print(pcMQ2Prefix);
  Serial.print(m_counter);
  Serial.println(pcPostfix);

  if(m_counter % 3 == 0) {
    delay(1000);
    Serial.print(pcLM35Prefix);
    Serial.print(m_counter + 11);
    Serial.println(pcPostfix);
    delay(2000);
    Serial.print(pcHCSR04Prefix);
    Serial.print(m_counter + 33);
    Serial.println(pcPostfix);
  }

  if(m_counter >= 60) m_counter = 0;
  m_counter++;

  delay(1000);
}
```

## Known Issues

**Do not use `Serial.print()` instead of `Serial.println()` (Not supported yet)**

- ISSUE: When the Arduino's reset button is pressed, sometimes the connection is terminated.
- FIX:
```
1. Disconnect the Arduino from the PC
2. Close the MagicMirror
3. Re-open the MagicMirror again
4. Connect Arduino to PC again
```
## License

### The MIT License (MIT)

Copyright © 2018 Furkan 'Dentrax' Türkal

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
