comicsApp.factory('ComicsService', ['$http', '$q', 'MarvelService', function ($http, $q, MarvelService) {
  var basePath = '/comics';
  var vm = this;

  function buildUrl (path) {
    var url = '';

    url = MarvelService.baseUrl +
      MarvelService.basePath +
      path;

    return url;
  }

  function getParams (additionalParams) {
    var defaultParams = {
      'apikey': MarvelService.key
    };
    var params = {};

    _.merge(params, defaultParams, additionalParams);

    return params;
  }

  vm.getComicsList = function (additionalParams) {
    var params;
    var url = buildUrl(basePath);

    params = getParams(additionalParams);

    return $http.get(url, {params: params})
      .then(
        function (response) {
          return response.data.data;
        },
        function (errResponse) {
          console.error('Error while fetching comics');
          console.log(errResponse);
          return errResponse;
        }
      );
  };

  vm.getComic = function (id) {
    var params;
    var url = buildUrl(basePath + '/' + id);

    params = getParams();

    return $http.get(url, {params: params})
      .then(
        function (response) {
          return response.data.data.results[0];
        },
        function (errResponse) {
          console.error('Error while fetching comic: ' + id);
          return errResponse;
        }
      );
  };

  return vm;
}]);
