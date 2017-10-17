angular
  .module('marvelApp.stories')
  .controller('StoriesController', function ($location, $routeParams, $scope, MarvelService) {
    var busy = false;
    var id;
    var itemId;
    var itemType;
    var max = false;
    var offset = 0;
    var params = {};
    var type = 'stories';

    $scope.stories = [];
    $scope.listOptions = {};
    $scope.infiniteScrollDisabled = false;
    $scope.currentItemType = type;

    id = $routeParams.id;
    $scope.currentItemId = id;
    if (typeof id !== 'undefined' && id !== null) {
      MarvelService.getItem(type, id).then(function (data) {
        console.log(data);
        $scope.story = data;
        $scope.characters = data.characters;
        $scope.charactersTotal = data.charactersTotal;
        $scope.comics = data.comics;
        $scope.comicsTotal = data.comicsTotal;
        $scope.creators = data.creators;
        $scope.creatorsTotal = data.creatorsTotal;
        $scope.events = data.events;
        $scope.eventsTotal = data.eventsTotal;
        $scope.series = data.series;
        $scope.seriesTotal = data.seriesTotal;
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
          $scope.stories = $scope.stories.concat(data.items);
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
          $scope.stories = data.items;
          $scope.total = data.total;
          offset = data.count;
          busy = false;
        });
      }
    };
  }).directive('storiesList', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/stories/list.html'
    };
  });
