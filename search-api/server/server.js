var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

const { LoggerSetup } = require('./LoggerSetup');

LoggerSetup();

const { getLogger } = require('@user-office-software/duo-logger');
const logger = getLogger();

app.connector('distributedConnector', require('./connectors/distributedConnector'))

// boot scripts mount components like REST API
boot(app, __dirname);

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    logger.logInfo(
      'PaNOSC federated search started',
      {
        'url': baseUrl
      }
    ); //eslint-disable-line no-console
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      logger.logInfo(
        'Swagger interface available',
        {
          'url': baseUrl + explorerPath
        }
      ); //eslint-disable-line no-console
    }
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
