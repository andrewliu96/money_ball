require('dotenv').config({ silent: true });

const server = require('./server');
const port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

/**
 * Start up the Express server and listen on port for events
 */
server.then(app => {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Watson Discovery UI Server running on port: %d', port);
  });
});
