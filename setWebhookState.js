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
    token: "78ffd7282722215359bca2ea8c2aeca4",
    logger: logger,
    service: 'webhookhelper'
}).then(function(client) {
    return setState(client);
}).catch(function(err) {
    console.log("Unable to initialize the client: " + err);
});

function setState(client) {
    const webhookId = 1;
    const desiredState = 1;

    return client.call({
        wsfunction: "local_webhookhelper_setstate",
        args: {
            // queryObject: JSON.stringify(queryObject),
            id: webhookId,
            enable: desiredState
        }
    }).then(function(response) {
        console.log("Response:")
        console.log(response)
    });
}