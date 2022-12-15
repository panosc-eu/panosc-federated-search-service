const utils = require("../../common/utils");
//const { getLogger } = require('@user-office-software/duo-logger');
//const logger = getLogger();
const { logger } = require('@user-office-software/duo-logger');

module.exports = (Model, options) => {
  // Set score property if not present
  Model.afterRemote('find', (ctx, result, next) => {

    const filter_invalid_scores = utils.getBoolEnvVar("FILTER_INVALID_SCORES", true);

    // log invalid scores
    ctx.result.forEach((instance) => {
      if (!('score' in instance) || typeof (instance.score) != 'number' || instance.score < 0 || instance.score >= 1) {
        //instance.score = 0;
        logger.logWarn("Model.afterRemote: invalid score");
        logger.logWarn("Model.afterRemote:Result: " + JSON.stringify(instance));
      }
    });

    // remove invalid scores outside the interval (0-1], 0 excluded, 1 included
    if (filter_invalid_scores) {
      ctx.result = ctx.result.filter((instance) => {
        if (!('score' in instance) ||
          typeof (instance.score) != 'number' ||
          instance.score <= 0 || instance.score >= 1) {
          logger.logWarn("Model.afterRemote: removing invalid score");
          logger.logWarn("Model.afterRemote:Result: " + JSON.stringify(instance));
          return false;
        }
        return true;
      })
    }
    next();
  });
};
