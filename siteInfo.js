// FOR REFERENCE
// THIS SCRIPT HITS THE SITE INFO WEBSERVICE
// Run with 'npm run info'

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
    username: "admin",
    password: "MoodlePassword1!",
    logger: logger,
}).then(function(client) {
    return get_site_info(client);
}).catch(function(err) {
    console.log("Unable to initialize the client: " + err);
});

function get_site_info(client) {
    return client.call({
        wsfunction: "core_webservice_get_site_info",
    }).then(function(info) {
        console.log(info);
        return;
    });
}

