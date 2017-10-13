comicsApp.controller('CharactersController', function($location, $q, $routeParams, $scope, MarvelService) {
    var busy = false;
    var data = null;
    var deferred = $q.defer();
    var id;
    var max = false;
    var offset = 0;
    var params;
    var paramsChanged = false;
    var self = this;
    var type = 'characters';

    $scope.characters = [];
    $scope.listOptions = {};
    $scope.infiniteScrollDisabled = false;

    id = $routeParams.id;
    if (typeof id !== 'undefined' && id !== null) {
      MarvelService.getItem(type, id).then(function(data) {
        console.log(data);
        $scope.character = data;
        $scope.comics = data.comics.items;
        $scope.events = data.events.items;
        $scope.series = data.series.items;
        $scope.stories = data.stories.items;
      });
    }

    $scope.loadMore = function() {
      if (!busy && !max) {
        busy = true;

        params = {
          offset: offset
        };

        if ($scope.listOptions.startsWith !== '') {
          params.nameStartsWith = $scope.listOptions.startsWith;
        } else {
          delete params.nameStartsWith;
        }

        MarvelService.getList(type, params).then(function(data) {

          if (data.count === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.characters = $scope.characters.concat(data.results);
          $scope.total = data.total;
          offset += data.count;
          busy = false;
        });
      }
    };

    $scope.filter = function() {
      if (!busy && !max) {
        busy = true;

        params = {
          offset: 0,
        };

        if ($scope.listOptions.startsWith !== '') {
          params.nameStartsWith = $scope.listOptions.startsWith;
        } else {
          delete params.nameStartsWith;
        }

        MarvelService.getList(type, params).then(function(data) {
          if (data.length === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.characters = data.results;
          $scope.total = data.total;
          offset = data.count;
          busy = false;
        });
      }
    };

    $scope.formatDate = function(date){
      var dateOut = new Date(date);
      return dateOut;
    };

    $scope.getIdFromResoureLink = function(link) {
      var id;
      var parts = link.split('/');

      id = parts.pop();

      return id;
    };
}).directive('charactersList', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/characters/list.html'
  };
});