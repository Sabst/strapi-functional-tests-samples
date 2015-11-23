'use strict';

const expect = require('stream-expect');
const co = require('co');

var strapiBin = 'node';

var strapiServer;

module.exports = {

  start: function(cb) {
    var strapiServerCmdArgsEnv = process.env.STRAPI_SERVER_CMD;
    if (strapiServerCmdArgsEnv) {
      var strapiServerCmdArgs = ['--harmony'].concat(strapiServerCmdArgsEnv.split(' '));
      console.log("Starting the Strapi server (using: node " + strapiServerCmdArgs.join(' ') + ')');
      strapiServer = expect.spawn(strapiBin, strapiServerCmdArgs);
      var waitingRegexp = /Your server is running at/;
      // If workers are used (not working with coverage yet), the regexp is /New worker starting.../
      strapiServer.expect(waitingRegexp, function(err, output, match) {
        console.log('Strapi server started!');
        cb();
      });
    } else {
      console.error('Error: STRAPI_SERVER_CMD must be defined (see Makefile)');
    }
  },
  stop: function(cb) {
    if (strapiServer && strapiServer.child) {
      strapiServer.child.kill();
      console.log("Strapi server stopped.");
    }
    cb();
  }

};
