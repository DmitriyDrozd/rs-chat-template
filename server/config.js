const { resolve } = require('path');
const { version } = require('../package.json');

module.exports = {
    staticPath: resolve(`${__dirname}/../dist`),
    port: process.env.PORT || 8080,
    isProduction: process.env.NODE_ENV === 'production',
    version,
};
