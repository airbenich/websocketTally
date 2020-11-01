var blinkstick = require("blinkstick");
var led = blinkstick.findFirst();

setLightOff();
turnOn();

const express = require("express");
const app = express();
const port = 3000;
app.use(express.static(__dirname + "/public"));

app.get("/tally/preview", function (req, res) {
  setTallyPreview();
  res.send();
});

app.get("/tally/program", function (req, res) {
  setTallyProgram();
  res.send();
});

app.get("/tally/transition", function (req, res) {
  setTallyTransition();
  res.send();
});

app.get("/tally/off", function (req, res) {
  setLightOff();
  res.send();
});

app.get("/call", function (req, res) {
  setCall();
  res.send();
});

app.listen(port, () => {
  console.log(`Tally light app listening at http://localhost:${port}`);
});

/* Tally Functions */
function setTallyProgram() {
  for (var i = 0; i < 8; i++) {
    led.setColor(255, 0, 0, { index: i });
  }
}

function setTallyPreview() {
  for (var i = 0; i < 8; i++) {
    led.morph(0, 255, 0, {
      duration: 50,
      index: i,
      steps: 10
    });
  }
}

function setTallyTransition() {
  for (var i = 0; i < 8; i++) {
    // led.setColor(0,255,0,{index:i});
  }
  led.setColor(255, 100, 0, { index: 0 });
  led.setColor(255, 100, 0, { index: 1 });
  led.setColor(255, 100, 0, { index: 2 });
  led.setColor(255, 100, 0, { index: 3 });
  led.setColor(255, 100, 0, { index: 4 });
  led.setColor(255, 100, 0, { index: 5 });
  led.setColor(255, 100, 0, { index: 6 });
  led.setColor(255, 100, 0, { index: 7 });
}

function setLightOff() {
  for (var i = 0; i < 8; i++) {
    led.setColor(0, 0, 0, { index: i });
  }
}

function setCall() {
  for (var i = 0; i < 8; i++) {
    led.blink(255, 100, 0, {
      repeats: 10,
      delay: 100,
      index: i,
    });
  }
}

function turnOn(params) {
  for (var i = 0; i < 8; i++) {
    led.blink(0, 255, 0, {
      repeats: 3,
      delay: 100,
      index: i,
    });
  }
}




/*
 * Websocket connection to blinkController
 */

var io = require("socket.io-client");

var CONFIG = {};
CONFIG.host = "172.17.121.12";
CONFIG.port = 3000;

// socket.io
client = io.connect("http://" + CONFIG.host + ":" + CONFIG.port, {
  query: "authentication=sDJZn16TuP7zu82a",
});

// on connection
client.on("connect", function () {
  console.log(
    "Successfully connected to http://" + CONFIG.host + ":" + CONFIG.port
  );
});

// on disconnect
client.on("disconnect", function () {
  console.log("Lost connection to http://" + CONFIG.host + ":" + CONFIG.port);
});

// recieve content from server
client.on("websocketTally", function (data) {
  console.log(data);
  if ((data.camera = 'mobil')) {
    switch (data.command) {
      case "tally/preview":
        setTallyPreview();
        break;
      case "tally/program":
        setTallyProgram();
        break;
      case "tally/transition":
        setTallyTransition();
        break;
      case "tally/off":
        setLightOff();
        break;
      case "call":
        setCall();
        break;

      default:
        break;
    }
  }
});
