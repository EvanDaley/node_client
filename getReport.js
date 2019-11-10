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
    token: "a232c59bd54b573c129514ac8840632e",
    logger: logger,
    service: 'reportlog'
}).then(function(client) {
    return getLog(client);
}).catch(function(err) {
    console.log("Unable to initialize the client: " + err);
});

function getLog(client) {
    const queryObject = {
        withCount: true,
        debug: true,
        joinWithGroups: true,
        desiredColumns: [
            'mdl_logstore_standard_log.id', 'eventname'
        ],
        dateRange: {
            start: 1571541618,
            end: 1972573859,
        },
        where: {
            // 'mdl_logstore_standard_log.eventname': '\\\\core\\\\event\\\\user_login_failed',
            // 'mdl_logstore_standard_log.userid': 2,
            'mdl_groups_members.groupid': 2
        },
        whereIn: {
            'mdl_logstore_standard_log.userid': ['1','2','3']
        },
        page: 1,
        pageSize: 100,
    }

    console.log('\nQUERY:', JSON.stringify(queryObject))

    return client.call({
        wsfunction: "local_reportlog_getlog",
        args: {
            queryObject: JSON.stringify(queryObject),
        }
    }).then(function(response) {
        decoded = JSON.parse(response)

        console.log("\nRAW RESPONSE:")
        console.log(response)

        console.log("\nDECODED RESPONSE:")
        for (var key in decoded) {
            console.log(`[${key}]:`, decoded[key], '\n')
        }
    });
}