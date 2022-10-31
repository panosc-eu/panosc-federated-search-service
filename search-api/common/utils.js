"use strict";

exports.getBoolEnvVar = (n, d) => {
  return (
    process.env[n]
      ? this.strToBool(process.env[n])
      : d
  );
};

exports.strToBool = (s) => {
  // will match one and only one of the string 'true','1', or 'on' rerardless
  // of capitalization and regardless off surrounding white-space.
  //
  const r = /^\s*(true|1|on)\s*$/i;

  return r.test(s);
};
