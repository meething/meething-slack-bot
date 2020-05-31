/ Meething Slack Bot
const request = require('request');
const express = require("express");
const app = express();
var Chance = require("chance");
var chance = new Chance();

var getRoomButton = function(room) {
  return {
      "response_type": "in_channel",
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":wave: Your Meething Room is ready!"
          }
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Join Meething",
                "emoji": false
              },
              "url": room
            }
          ]
        }
      ]
    }
}

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
  var randomRoom = chance.animal().trim() + "_" + chance.first().trim() + "_" + chance.city().trim();
  var conference =
    "Videoroom Ready at: https://us.meething.space/?room=" + randomRoom.trim();
  // var res = getRoom(conference);
  var res = getRoomButton("https://us.meething.space/" + randomRoom.trim());
  response.json(res);
});

app.get('/auth', function(req, res){
  if (!req.query.code) { // access denied
    return;
  }
  var data = {form: {
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_SECRET,
    code: req.query.code
  }};
  request.post('https://slack.com/api/oauth.access', data, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Get an auth token
      let oauthToken = JSON.parse(body).access_token;
      // OAuth done- redirect the user to wherever
      res.redirect(__dirname + "/public/success.html");
    }
  })
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
