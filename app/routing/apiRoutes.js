var path = require("path");

var friends = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req,res) {
        res.JSON(friends);
    })

    app.post("/api/friends", function(req,res) {
        var userInfo = req.body;
        var userResponses = userInfo.scores;

        var matchName = "";
        var matchImage = "";
        var totalDiff = 10000;

        for (var i = 0; i < friends.length; i++) {
            var diff = 0;

            for (var j = 0; j < userResponses.length; i++) {
                diff += Math.abs(friends[i].scores[j] - userResponses[j]);
            }

            if (diff < totalDiff) {
                totalDiff = diff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }

        }
        friends.push(userInfo);

        res.JSON({status: "OK", matchName: matchName, matchImage: matchImage});
    });
};