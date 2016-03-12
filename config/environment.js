var _ = require('lodash');

var localEnvVars = {
  TITLE:      'jamn_api',
  SAFE_TITLE: 'jamn_api',
  SECRET:     'jamnsonwheredyoufindthatcourt'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
