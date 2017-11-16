(function() {
  'use strict';

  var marvelApp = angular.module('marvelApp', [
    'ngRoute',
    'infinite-scroll',
    'marvelApp.characters',
    'marvelApp.comics',
    'marvelApp.creators',
    'marvelApp.events',
    'marvelApp.series',
    'marvelApp.stories'
  ]).constant('_', window._) // allow DI for use in controllers, unit tests
    // use in views, ng-repeat="x in _.range(3)"
    .run(function ($rootScope) {
      $rootScope._ = window._;
    })
    .directive('belongingTo', function () {
      return {
        restrict: 'E',
        templateUrl: 'templates/partials/belonging-to.html'
      };
    })
    .directive('itemCount', function () {
      return {
        restrict: 'E',
        templateUrl: 'templates/partials/item-count.html'
      };
    })
    .directive('listOptions', function () {
      return {
        restrict: 'E',
        templateUrl: 'templates/partials/list-options.html'
      };
    });
})();
