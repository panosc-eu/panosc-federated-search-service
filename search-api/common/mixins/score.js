const utils = require("../../common/utils");

module.exports = (Model, options) => {
  // Set score property if not present
  Model.afterRemote('find', (ctx, result, next) => {

    const filter_invalid_results = utils.getBoolEnvVar("FILTER_INVALID_RESULTS", true);

    // log invalid scores
    ctx.result.forEach((instance) => {
      //console.log("Model:afterRemote:instance : " + JSON.stringify(instance));
      //console.log("Model:afterRemote:keys : " + JSON.stringify(Object.keys(instance)));
      //console.log("Model:afterRemote:test : " + !('score' in instance));
      if (!('score' in instance) || typeof (instance.score) != 'number' || instance.score < 0 || instance.score >= 1) {
        //console.log("Model:afterRemote setting score to 0");
        //instance.score = 0;
        console.log("Model.afterRemote: invalid score");
        console.log("Model.afterRemote:Result: " + JSON.stringify(instance));
      }
    });

    // remove invalid scores outside the interval (0-1], 0 excluded, 1 included
    if (filter_invalid_results) {
      ctx.result = ctx.result.filter((instance) => {
        if (!('score' in instance) ||
          typeof (instance.score) != 'number' ||
          instance.score <= 0 || instance.score >= 1) {
          console.log("Model.afterRemote: removing invalid score");
          console.log("Model.afterRemote:Result: " + JSON.stringify(instance));
          return false;
        }
        return true;
      })
    }
    next();
  });
};
