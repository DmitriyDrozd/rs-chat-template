const express = require('express');
const { json } = require('body-parser');
const { port, staticPath, isProduction, version } = require('./config');
const { info } = require('./helpers/logger');

const server = express();

info(`---------------------CHAT SERVER v${version}---------------------`);
server.use(express.static(staticPath));
info(`Static is used from ${staticPath}`);
info(`Running in ${isProduction ? 'PRODUCTION' : 'DEV'} mode`);
server.use(json());
server.listen(port, () => {
    info(`Server was started on port ${port}`);
    info('------------------------------------------------------------');
});
