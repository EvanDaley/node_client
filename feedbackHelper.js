// FOR REFERENCE
// THIS SCRIPT HITS THE HELLO WORLD WEBSERVICE
// Run with 'npm run report'

var moodle_client = require("moodle-client");
var winston = require("winston");

var logger = winston.createLogger({
    level: "debug",
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console()
    ]
});

moodle_client.init({
    wwwroot: "http://localhost/",
    token: "29c5d300b87ba131f01da61b912962a2",
    logger: logger,
    service: 'feedbackhelper'
}).then(function(client) {
    return callDeleteFunction(client);
}).catch(function(err) {
    console.log("Unable to initialize the client: " + err);
});

function callDeleteFunction(client) {
    const criteria = {
        feedback_id: 1,
        user_id: 3,
    };

    return client.call({
        wsfunction: "local_feedbackhelper_delete",
        args: {
            criteria: JSON.stringify(criteria),
        }
    }).then(function(response) {
        console.log(response)
        decoded = JSON.parse(response)

        console.log("\nRAW RESPONSE:")
        console.log(response)

        console.log("\nDECODED RESPONSE:")
        for (var key in decoded) {
            console.log(`[${key}]:`, decoded[key], '\n')
        }
    });
}