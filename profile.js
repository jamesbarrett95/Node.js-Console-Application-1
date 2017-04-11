const https = require("https");

function printError(error) {
  console.error(error.message);
}

function printMessage(username, badges, points) {
    console.log(`${username} has ${badges} badges and ${points} JavaScript points`);
}

function getProfile(username) {
    try {
        const request = https.get(`https://teamtreehouse.com/${username}.json`, (res) => {
          if (res.statusCode === "200") {
            let body = "";
            res.on("data", (data) => {
                body += data;
            });

            res.on("end", () => {
                try {
                    const profile = JSON.parse(body);
                    printMessage(username, profile.badges.length, profile.points.JavaScript);
                } catch (error) {
                    printError(error);
                }
            });
          } else {
            const errorMessage = `The profile ${username} could not be found ${res.statusCode}`;
            const statusCodeError = new Error(errorMessage);
            printError(statusCodeError);
          }
        });

        request.on("error", error => printError(`Problem with request: ${error.message}`));
    } catch (error) {
        printError(error);
    }
}

module.exports.get = getProfile;
