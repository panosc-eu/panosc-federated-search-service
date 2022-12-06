const { getLogger } = require('@user-office-software/duo-logger');
const logger = getLogger();

module.exports = Aggregator;

function compareByScore(a, b) {
  if (a.score < b.score) {
    return 1;
  }
  if (a.score > b.score) {
    return -1;
  }
  return 0;
}

function sortAlphabetically(a, b) {
  if (typeof a != "string" && typeof a != "undefined" && 'title' in a) {
    // if we have title, sort by title
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    else if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
  }
  else if (typeof a != "string" && typeof a != "undefined" && 'name' in a) {
    // if we have name, sort by name
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    else if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
  }
  return 0;
}

function Sort(mergedResults, sortByScore) {
  return mergedResults.sort((sortByScore ? compareByScore : sortAlphabetically));
}

function Aggregator(results, method, callback, limit = -1, sortByScore = true) {
  logger.logDebug(
    'aggregator Aggregator 1',
    {
      'number of results': results.length,
      'method': method,
    }
  );

  if (method == 'count') {
    logger.logDebug('aggregator Aggregator count', {});
    let mergedResults = 0;
    for (let result of results) {
      if (result != null) {
        mergedResults += result;
      }
    }
    callback(null, mergedResults);
  } else if (method == 'statistics') {
    logger.logDebug('aggregator Aggregator statistics', {});
    var parameters = {};
    for (let result of results) {
      if (result != null) {
        for (let parameter of Object.keys(result)) {
          if (parameters[parameter] === undefined) {
            parameters[parameter] = result[parameter];
          } else {
            for (let value of result[parameter]) {
              var availableParameter = undefined;
              for (let statParameter of parameters[parameter]) {
                if (statParameter.value === value.value && statParameter.unit === value.unit) {
                  availableParameter = statParameter;
                }
              }
              if (availableParameter === undefined) {
                parameters[parameter].push(value);
              } else {
                availableParameter.count += value.count;
              }
            }
          }
        }
      }
    }
    callback(null, parameters);
  } else {
    logger.logDebug('aggregator Aggregator other 1', {});
    let mergedResults = new Array();
    for (let result of results) {
      if (result != null) {
        if (Array.isArray(result)) {
          logger.logInfo(
            'aggregator Aggregator results loop 1',
            {
              'number of results': result.length
            }
          );
          if (result.length > 0) {
            logger.logInfo(
              'aggregator Aggregator results loop 2',
              {
                'provider': result[0].provider,
              }
            );
            mergedResults = mergedResults.concat(result);
          }
        } else {
          logger.logInfo(
            'aggregator Aggregator results loop 3',
            {
              'number of results': 1,
              'provider': results.provider,
            }
          );
          mergedResults = mergedResults.concat(result);
        }
      }
    }
    if (method == 'findById') {
      logger.logDebug(
        'aggregator Aggregator findById',
        {
          'number of total results': mergedResults.length,
        }
      );
      if (mergedResults.length > 0) {
        callback(null, mergedResults[0]);
      } else {
        callback(null, null);
      }
    } else {
      logger.logDebug(
        'aggregator Aggregator other 2',
        {
          'number of total results': mergedResults.length,
          'sort by score': sortByScore,
          'limit': limit
        }
      );
      mergedResults = Sort(mergedResults, sortByScore);
      callback(null, (limit > 0 ? mergedResults.slice(0, limit) : mergedResults));
    }
  }
}
