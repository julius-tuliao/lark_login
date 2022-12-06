const package = require('../../package.json');
const fs = require('fs-extra');
const debug = require('debug')('server-connect:setup:config');
const { toSystemPath } = require('../core/path');
const { mergeDeep } = require('../core/util');
const Parser = require('../core/parser');
const Scope = require('../core/scope');

const config = {
    port: process.env.PORT || 3000,
    debug: false,
    secret: 'Need to be set',
    tmpFolder: '/tmp',
    abortOnDisconnect: false,
    createApiRoutes: true,
    compression: true,
    redis: false,
    cron: true,
    static: {
        index: false
    },
    session: {
        name: package.name + '.sid',
        resave: false,
        saveUninitialized: false,
        store: { $type: 'memory', ttl: 86400000 }
    },
    cors: { // see https://github.com/expressjs/cors
        origin: false,
        methods: 'GET,POST',
        allowedHeaders: '*',
        credentials: true
    },
    globals: {},
    mail: {},
    auth: {},
    oauth: {},
    db: {},
    s3: {},
    jwt: {},
    stripe: {},
    env: {}
};

if (fs.existsSync('app/config/config.json')) {
    mergeDeep(config, fs.readJSONSync('app/config/config.json'))
}

if (fs.existsSync('app/config/user_config.json')) {
    mergeDeep(config, fs.readJSONSync('app/config/user_config.json'));
}

// folders are site relative
config.tmpFolder = toSystemPath(config.tmpFolder);

if (config.debug) {
    require('debug').enable(typeof config.debug == 'string' ? config.debug : 'server-connect:*');
}

if (config.env) {
    for (let key in config.env) {
        if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
            process.env[key] = config.env[key];
        } else if (config.debug) {
            debug(`"${key}" is already defined in \`process.env\` and will not be overwritten`);
        }
    }
}

Parser.parseValue(config, new Scope({
    $_ENV: process.env
}));

debug(config);

module.exports = config;