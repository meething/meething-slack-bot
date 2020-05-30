// Meething Slack Bot
const express = require("express");
const app = express();
var Chance = require("chance");
var chance = new Chance();

var getRoom = function(room) {
  return {
    response_type: "in_channel",
    text: room,
    attachments: [
      {
        text: "Enjoy your Meething!"
      }
    ]
  };
};

app.post("/meething", (request, response) => {
  console.log('got request!');
  var randomRoom = chance.animal() + "_" + chance.first() + "_" + chance.city();
  var conference =
    "Videoroom Ready at: https://us.meething.space/?room=" + randomRoom.trim();
  // express helps us take JS objects and send them as JSON
  var res = getRoom(conference);
  response.json(res);
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
