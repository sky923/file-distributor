const argv = require('argh')(process.argv);
const path = require('path');
const isSecured = argv.secure ? argv.secure : true;
const config = {
    secured: isSecured,
    ip: require('ip').address(),
    port: argv.port ? argv.port : (isSecured ? 443 : 80),
    argv
};

if (argv.folder) {
    config.folder = path.resolve(argv.folder);
} else {
    console.error(`you need argument '--folder=[string]'`);
}

module.exports = config;