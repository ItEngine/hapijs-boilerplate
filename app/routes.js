// Routes
const pluginRoutes = {
  name: 'routes',
  version: '1.0.0',
  register: (server) => {
    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => h.view('index'),
    });
  },
};

module.exports = pluginRoutes;
