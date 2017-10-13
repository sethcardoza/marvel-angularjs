comicsApp.controller('ComicsController', function($location, $q, $routeParams, $scope, MarvelService) {
    var busy = false;
    var data = null;
    var deferred = $q.defer();
    var id;
    var itemType;
    var itemId;
    var max = false;
    var offset = 0;
    var params;
    var paramsChanged = false;
    var self = this;
    var type = 'comics';

    $scope.comics = [];
    $scope.listOptions = {};
    $scope.infiniteScrollDisabled = false;

    id = $routeParams.id;
    if (typeof id !== 'undefined' && id !== null) {
      MarvelService.getItem(type, id).then(function(data) {
        $scope.comic = data;
        $scope.creators = data.creators.items;
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

        itemType = $routeParams.itemType;
        itemId = $routeParams.itemId;
        if (itemType && itemId) {
          params[itemType] = itemId;
        }

        if ($scope.listOptions.startsWith !== '') {
          params.titleStartsWith = $scope.listOptions.startsWith;
        } else {
          delete params.titleStartsWith;
        }

        MarvelService.getList(type, params).then(function(data) {
          console.log(data);
          if (data.count === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.comics = $scope.comics.concat(data.results);
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

        itemType = $routeParams.itemType;
        itemId = $routeParams.itemId;
        if (itemType && itemId) {
          params[itemType] = itemId;
        }

        if ($scope.listOptions.startsWith !== '') {
          params.titleStartsWith = $scope.listOptions.startsWith;
        } else {
          delete params.titleStartsWith;
        }

        MarvelService.getList(type, params).then(function(data) {
          if (data.length === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.comics = data.results;
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
}).directive('comicsList', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/comics/list.html'
  };
});