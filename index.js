var moodle_client = require("moodle-client");

moodle_client.init({
    wwwroot: "http://localhost/moodle/",
    token: "d457b5e5b0cc31c05ccf38628e4dfc14"

}).then(function(client) {
    return do_something(client);

}).catch(function(err) {
    console.log("Unable to initialize the client: " + err);
});

