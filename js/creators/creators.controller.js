comicsApp.controller('CreatorsController', function($location, $q, $routeParams, $scope, MarvelService) {
    var busy = false;
    var data = null;
    var deferred = $q.defer();
    var id;
    var itemType;
    var itemId;
    var max = false;
    var offset = 0;
    var params = {};
    var self = this;
    var type = 'creators';

    $scope.creators = [];
    $scope.listOptions = {};
    $scope.infiniteScrollDisabled = false;
    $scope.currentItemType = type;

    id = $routeParams.id;
    $scope.currentItemId = id;
    if (typeof id !== 'undefined' && id !== null) {
      MarvelService.getItem(type, id).then(function(data) {
        console.log(data);
        $scope.creator = data;
        $scope.comics = data.comics.items;
        $scope.events = data.events.items;
        $scope.series = data.series.items;
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
          params.nameStartsWith = $scope.listOptions.startsWith;
        } else {
          delete params.nameStartsWith;
        }

        MarvelService.getList(type, params).then(function(data) {

          if (data.count === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.creators = $scope.creators.concat(data.results);
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
          params.nameStartsWith = $scope.listOptions.startsWith;
        } else {
          delete params.nameStartsWith;
        }

        MarvelService.getList(type, params).then(function(data) {
          if (data.length === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.creators = data.results;
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
}).directive('creatorsList', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/creators/list.html'
  };
});
