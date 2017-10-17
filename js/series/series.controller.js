angular
  .module('marvelApp.series')
  .controller('SeriesController', function ($location, $routeParams, $scope, MarvelService) {
    var busy = false;
    var id;
    var itemId;
    var itemType;
    var max = false;
    var offset = 0;
    var params = {};
    var type = 'series';

    $scope.series = [];
    $scope.listOptions = {};
    $scope.infiniteScrollDisabled = false;
    $scope.currentItemType = type;

    id = $routeParams.id;
    $scope.currentItemId = id;
    if (typeof id !== 'undefined' && id !== null) {
      MarvelService.getItem(type, id).then(function (data) {
        console.log(data);
        $scope.series = data;
        $scope.characters = data.characters;
        $scope.charactersTotal = data.charactersTotal;
        $scope.comics = data.comics;
        $scope.comicsTotal = data.comicsTotal;
        $scope.creators = data.creators;
        $scope.creatorsTotal = data.creatorsTotal;
        $scope.events = data.events;
        $scope.eventsTotal = data.eventsTotal;
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
          params.titleStartsWith = $scope.listOptions.startsWith;
        } else {
          delete params.titleStartsWith;
        }

        MarvelService.getList(type, params).then(function (data) {
          if (data.count === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.series = $scope.series.concat(data.items);
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
          params.titleStartsWith = $scope.listOptions.startsWith;
        } else {
          delete params.titleStartsWith;
        }

        MarvelService.getList(type, params).then(function (data) {
          if (data.count === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.series = data.items;
          $scope.total = data.total;
          offset = data.count;
          busy = false;
        });
      }
    };
  }).directive('seriesList', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/series/list.html'
    };
  });
