comicsApp.controller('SeriesController', function($location, $q, $routeParams, $scope, MarvelService) {
    var busy = false;
    var data = null;
    var deferred = $q.defer();
    var id;
    var max = false;
    var offset = 0;
    var params = {};
    var self = this;
    var type = 'series';

    $scope.series = [];
    $scope.listOptions = {};
    $scope.infiniteScrollDisabled = false;
    $scope.currentItemType = type;

    id = $routeParams.id;
    $scope.currentItemId = id;
    if (typeof id !== 'undefined' && id !== null) {
      MarvelService.getItem(type, id).then(function(data) {
        console.log(data);
        $scope.series = data;
        $scope.characters = data.characters.items;
        $scope.comics = data.comics.items;
        $scope.creators = data.creators.items;
        $scope.events = data.events.items;
        $scope.stories = data.stories.items;
      });
    }

    itemType = $routeParams.itemType;
    itemId = $routeParams.itemId;
    if (itemType && itemId) {
      params[itemType] = itemId;
      MarvelService.getItem(itemType, itemId).then(function(data) {
        console.log(data);
        $scope.belongingTo = data;
        $scope.belongingTo.type = itemType;
      });
    }

    $scope.loadMore = function() {
      if (!busy && !max) {
        busy = true;

        params.offset = offset;

        if ($scope.listOptions.startsWith !== '') {
          params.titleStartsWith = $scope.listOptions.startsWith;
        } else {
          delete params.titleStartsWith;
        }

        MarvelService.getList(type, params).then(function(data) {
          if (data.count === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.series = $scope.series.concat(data.results);
          $scope.total = data.total;
          offset += data.count;
          busy = false;
        });
      }
    };

    $scope.filter = function() {
      if (!busy && !max) {
        busy = true;

        params.offset = 0;

        if ($scope.listOptions.startsWith !== '') {
          params.titleStartsWith = $scope.listOptions.startsWith;
        } else {
          delete params.titleStartsWith;
        }

        MarvelService.getList(type, params).then(function(data) {
          if (data.count === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.series = data.results;
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

    $scope.display = function(item) {
      var title;

      if (item.title) {
        title = item.title;
      } else if (item.fullName) {
        title = item.fullName;
      } else if (item.name) {
        title = item.name;
      }

      return title;
    }
}).directive('seriesList', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/series/list.html'
  };
});
