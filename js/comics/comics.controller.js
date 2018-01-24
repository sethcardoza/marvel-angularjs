(function () {
  'use strict';

  angular
    .module('marvelApp.comics')
    .controller('ComicsController', function ($location, $routeParams, $scope, MarvelService) {
      var busy = false;
      var id;
      var itemType;
      var itemId;
      var max = false;
      var offset = 0;
      var params = {};
      var type = 'comics';

      $scope.comics = [];
      $scope.listOptions = {};
      $scope.infiniteScrollDisabled = false;
      $scope.currentItemType = type;

      id = $routeParams.id;
      $scope.currentItemId = id;
      if (typeof id !== 'undefined' && id !== null) {
        MarvelService.getItem(type, id).then(function (data) {
          $scope.comic = data;
          $scope.characters = data.characters;
          $scope.charactersTotal = data.charactersTotal;
          $scope.creators = data.creators;
          $scope.creatorsTotal = data.creatorsTotal;
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
            $scope.comics = $scope.comics.concat(data.items);
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
            if (data.length === 0) {
              max = true;
              $scope.infiniteScrollDisabled = true;
            }
            $scope.comics = data.items;
            $scope.total = data.total;
            offset = data.count;
            busy = false;
          });
        }
      };
    }).directive('comicsList', /* istanbul ignore next */ function () {
      return {
        restrict: 'E',
        templateUrl: 'templates/comics/list.html'
      };
    });
})();
