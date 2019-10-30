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
    // token: "d457b5e5b0cc31c05ccf38628e4dfc14"
    username: "admin",
    password: "MoodlePassword1!",
    logger: logger,
    service: 'log_report'
}).then(function(client) {
    return hello_world(client);
}).catch(function(err) {
    console.log("Unable to initialize the client: " + err);
});

function hello_world(client) {
    return client.call({
        wsfunction: "local_wsreport_retrieve",
    }).then(function(info) {
        console.log(info);
        return;
    });
}