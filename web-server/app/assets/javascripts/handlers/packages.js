define(function(require) {
  var SotaDispatcher = require('sota-dispatcher'),
      _ = require('underscore'),
      db = require('../stores/db'),
      sendRequest = require('../mixins/send-request');

  var Handler = (function() {
      this.dispatchCallback = function(payload) {
        switch(payload.actionType) {
          case 'get-packages':
            sendRequest.doGet('/api/v1/packages')
              .success(function(packages) {
                db.packages.reset(packages);
              });
          break;
          case 'get-package':
            sendRequest.doGet('/api/v1/packages')
              .success(function(packages) {
                var showPackage = _.find(packages, function(package) {
                  return package.id.name == payload.name && package.id.version == payload.version;
                });
                showPackage.id = showPackage.id.name + '-' + showPackage.id.version;
                db.showPackage.reset(showPackage);
              });
          break;
          case 'search-packages-by-regex':
            var query = payload.regex ? '?regex=' + payload.regex : '';

            sendRequest.doGet('/api/v1/packages' + query)
              .success(function(packages) {
                db.searchablePackages.reset(packages);
              });
          break;
          case 'get-packages-for-vin':
            sendRequest.doGet('/api/v1/vehicles/' + payload.vin + '/package')
              .success(function(packages) {
                db.packagesForVin.reset(packages);
              });
          break;
          case 'get-vehicles-queued-for-package':
            sendRequest.doGet('/api/v1/packages/' + payload.name + "/" + payload.version + "/queued")
              .success(function(vehicles) {
                db.vehiclesQueuedForPackage.reset(vehicles);
              });
          break;
        }
      };
      SotaDispatcher.register(this.dispatchCallback.bind(this));
  });

  return new Handler();

});
