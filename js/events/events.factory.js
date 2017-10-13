comicsApp.factory('EventsService', ['$http', '$q', 'MarvelService', function($http, $q, MarvelService) {
  var basePath = '/events';
  var vm = this;

  function buildUrl(path) {
    var config;
    var url = '';

    url = MarvelService.baseUrl +
      MarvelService.basePath +
      path;

    return url;
  }
  function getParams(additionalParams) {
    var defaultParams = {
      'apikey': MarvelService.key
    };
    var params = {};

    _.merge(params, defaultParams, additionalParams);

    return params;
  }

  vm.getEventsList = function(additionalParams) {
    var url = buildUrl(basePath);

    params = getParams(additionalParams);

    return $http.get(url, {params: params})
      .then(
        function(response) {
          return response.data.data;
        },
        function(errResponse) {
          console.error('Error while fetching events');
          return errResponse;
        }
    );
  };

  vm.getEvent = function(id) {
    var url = buildUrl(basePath + '/' + id);

    params = getParams();

    return $http.get(url, {params: params})
      .then(
        function(response) {
          return response.data.data.results[0];
        },
        function(errResponse) {
          console.error('Error while fetching event: ' + id);
          return errResponse;
        }
    );
  };

  return vm;

}]);
