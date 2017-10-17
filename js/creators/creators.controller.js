comicsApp.controller('CreatorsController', function ($location, $routeParams, $scope, MarvelService) {
  var busy = false;
  var id;
  var itemType;
  var itemId;
  var max = false;
  var offset = 0;
  var params = {};
  var type = 'creators';

  $scope.creators = [];
  $scope.listOptions = {};
  $scope.infiniteScrollDisabled = false;
  $scope.currentItemType = type;

  id = $routeParams.id;
  $scope.currentItemId = id;
  if (typeof id !== 'undefined' && id !== null) {
    MarvelService.getItem(type, id).then(function (data) {
      console.log(data);
      $scope.creator = data;
      $scope.comics = data.comics;
      $scope.comicsTotal = data.comicsTotal;
      $scope.events = data.events;
      $scope.eventsTotal = data.eventsTotal;
      $scope.series = data.series;
      $scope.seriesTotal = data.seriesTotal;
      $scope.stories = data.stories;
      $scope.storiesTotal = data.storiesTotal;
    });
  }

  itemType = $routeParams.itemType;
  itemId = $routeParams.itemId;
  if (itemType && itemId) {
    params[itemType] = itemId;
    MarvelService.getItem(itemType, itemId).then(function (data) {
      console.log(data);
      $scope.belongingTo = data;
      $scope.belongingTo.type = itemType;
    });
  }

  $scope.loadMore = function () {
    if (!busy && !max) {
      busy = true;

      params.offset = offset;

      if ($scope.listOptions.startsWith !== '') {
        params.nameStartsWith = $scope.listOptions.startsWith;
      } else {
        delete params.nameStartsWith;
      }

      MarvelService.getList(type, params).then(function (data) {
        if (data.count === 0) {
          max = true;
          $scope.infiniteScrollDisabled = true;
        }
        $scope.creators = $scope.creators.concat(data.items);
        $scope.total = data.total;
        offset += data.count;
        busy = false;
      });
    }
  };

  $scope.filter = function () {
    if (!busy && !max) {
      busy = true;

      params.offset = 0;

      if ($scope.listOptions.startsWith !== '') {
        params.nameStartsWith = $scope.listOptions.startsWith;
      } else {
        delete params.nameStartsWith;
      }

      MarvelService.getList(type, params).then(function (data) {
        if (data.length === 0) {
          max = true;
          $scope.infiniteScrollDisabled = true;
        }
        $scope.creators = data.items;
        $scope.total = data.total;
        offset = data.count;
        busy = false;
      });
    }
  };
}).directive('creatorsList', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/creators/list.html'
  };
});
