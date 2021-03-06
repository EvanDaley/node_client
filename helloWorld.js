// FOR REFERENCE
// THIS SCRIPT HITS THE HELLO WORLD WEBSERVICE
// For this to work you need to provide a specific 'shortname' to the hello world service.
// select * from mdl_external_services where component = 'local_wstemplate', update the shortname to 'hello_world'
// Run with 'npm run hello'

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
    service: 'hello_world'
}).then(function(client) {
    return hello_world(client);
}).catch(function(err) {
    console.log("Unable to initialize the client: " + err);
});

function hello_world(client) {
    return client.call({
        wsfunction: "local_wstemplate_hello_world",
    }).then(function(info) {
        console.log(info);
        return;
    });
}