const { setLogger, ConsoleLogger, GrayLogLogger } = require('@user-office-software/duo-logger');

function LoggerSetup() {
  /*
   * "LOGGING": "NONE", //NONE, MUTE, CONSOLE, GRAYLOG
   * "LOGGING_SERVER": "it-graylog.esss.lu.se",
   * "LOGGING_PORT": "12201",
   * "LOGGING_ENVIRONMENT": "max-local",
   * "LOGGING_SERVICE": "panosc.federated.search",
   */
  const loggingType = (process.env.LOGGING || "NONE").toString().toLowerCase();
  const loggingServer = process.env.LOGGING_SERVER || "none";
  const loggingPort = parseInt(process.env.LOGGING_PORT || "0");
  const loggingEnvironment = process.env.LOGGING_ENVIRONMENT || "panosc-federated-search-unknown";
  const loggingService = process.env.LOGGING_SERVICE || "panosc-federated-search-unknown";

  let logger = null;

  switch (loggingType) {
    case 'console':
      logger = new ConsoleLogger();
      break;
    case 'graylog':
      logger = new GrayLogLogger(
        loggingServer,
        loggingPort,
        {
          'environment': loggingEnvironment,
          'service': loggingService
        },
        []
      );
      break;
    default:
      logger = new ConsoleLogger();
      break;
  }

  setLogger(logger);
}

exports.LoggerSetup = LoggerSetup;
