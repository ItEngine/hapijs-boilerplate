const path = require('path');
const Hapi = require('hapi');
const Dotenv = require('dotenv');

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
  // Register plugins
  await server.register([require('vision'), require('./app/routes')]);

  // Config environment for views
  server.views({
    engines: {
      html: {
        module: require('handlebars'),
        compileMode: 'sync'
      }
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
