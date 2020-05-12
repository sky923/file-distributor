const http = require('http');
const https = require('https');
const express = require('express');
const next = require('next');
const fs = require('fs');
const config = require('./src/config');
const help = () => {
    console.log(`
    --help, -h: this page
    --port=[number]: port for server
    --folder=[string]: folder to distribute files
    `);
};
if (config.argv.h || config.argv.help) {
    help();
    process.exit(0);
}
if (!config.folder) {
    help();
    process.exit(-1);
}
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const privateKey = fs.readFileSync('file-distributor.key', 'utf8');
const certificate = fs.readFileSync('file-distributor.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

nextApp.prepare().then(async () => {
    const app = express();
    const server = config.secured ? https.createServer(credentials, app) : http.createServer(app);

    app.use(express.static(config.folder));
    app.get('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(config.port, err => {
        if (err) {
            throw err;
        }
        console.log(`> Ready on ${config.secured ? 'https' : 'http'}://${config.ip}:${config.port}`);
    });
}).catch(err => {
    console.log(err);
});