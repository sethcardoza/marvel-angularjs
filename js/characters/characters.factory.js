comicsApp.factory('CharactersService', ['$http', '$q', 'MarvelService', function($http, $q, MarvelService) {
  var basePath = '/characters';
  var vm = this;

  function buildUrl(path) {
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

  vm.getCharactersList = function(additionalParams) {
    var url = buildUrl(basePath);

    params = getParams(additionalParams);

    return $http.get(url, {params: params})
      .then(
        function(response) {
          return response.data.data;
        },
        function(errResponse) {
          console.error('Error while fetching characters');
          console.log(errResponse);
          return errResponse;
        }
    );
  };

  vm.getCharacter = function(id) {
    var url = buildUrl(basePath + '/' + id);

    params = getParams();

    return $http.get(url, {params: params})
      .then(
        function(response) {
          return response.data.data.results[0];
        },
        function(errResponse) {
          console.error('Error while fetching character: ' + id);
          return errResponse;
        }
    );
  };

  return vm;

}]);
