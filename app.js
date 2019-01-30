const path = require('path');
const Hapi = require('hapi');
const Dotenv = require('dotenv');
const Handlerbars = require('handlebars');
const Vision = require('vision');
const routesPlugin = require('./app/routes');

// Env variables
const pathEnv = path.join(__dirname, 'app/config/.env');
Dotenv.config({ path: pathEnv });

const { PORT, HOST } = process.env;

// Run server
const server = Hapi.server({
  host: HOST,
  port: PORT,
});

/**
* @method register
* @description Register plugins
*/
async function register() {
  const plugins = [
    Vision,
    routesPlugin,
  ];

  // Register plugins
  await server.register(plugins);

  // Config environment for views
  server.views({
    engines: {
      html: {
        module: Handlerbars,
        compileMode: 'sync',
      },
    },
    compileMode: 'async',
    relativeTo: __dirname,
    path: 'app/templates',
  });
}

/**
* @method start
* @description Start server
*/
async function start() {
  try {
    // Register plugins
    await register();

    // Start server
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
}


// Run application
start();

module.exports = server;
