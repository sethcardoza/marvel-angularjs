(function() {
  'use strict';

  angular
  .module('marvelApp')
  .factory('MarvelService', ['$http', 'NormalizerService', 'MARVEL_API_KEY', function ($http, NormalizerService, MARVEL_API_KEY) {
    var vm = this;
    var baseUrl = 'http://gateway.marvel.com';
    var basePath = '/v1/public/';
    var key = MARVEL_API_KEY;

    vm.baseUrl = baseUrl;
    vm.basePath = basePath;
    vm.key = key;

    function buildUrl (path) {
      var url = '';

      url = baseUrl +
        basePath +
        path;

      return url;
    }

    function getParams (additionalParams) {
      var defaultParams = {
        'apikey': key
      };
      var params = {};

      _.merge(params, defaultParams, additionalParams);

      return params;
    }

    vm.getList = function (type, additionalParams) {
      var params;
      var url = buildUrl(type);

      params = getParams(additionalParams);

      return $http.get(url, {params: params})
        .then(
          function (response) {
            var data = {};
            var items = [];
            var item;

            for (var i = 0; i < response.data.data.results.length; i++) {
              item = NormalizerService.normalize(type, response.data.data.results[i]);
              items.push(item);
            }
            data.items = items;
            data.count = response.data.data.count;
            data.total = response.data.data.total;

            return data;
          },
          function (errResponse) {
            console.error('Error while fetching ' + type);
            console.log(errResponse);
            return errResponse;
          }
        );
    };

    vm.getItem = function (type, id) {
      var params;
      var url = buildUrl(type + '/' + id);

      params = getParams();

      return $http.get(url, {params: params})
        .then(
          function (response) {
            var item;

            item = NormalizerService.normalize(type, response.data.data.results[0]);

            return item;
          },
          function (errResponse) {
            console.error('Error while fetching ' + type + ': ' + id);
            return errResponse;
          }
        );
    };

    return vm;
  }]);
})();
