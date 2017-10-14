'use strict';

var comicsApp = angular.module('comicsApp', ['ngRoute', 'infinite-scroll'])
  // allow DI for use in controllers, unit tests
  .constant('_', window._)
  // use in views, ng-repeat="x in _.range(3)"
  .run(function ($rootScope) {
     $rootScope._ = window._;
  })
  .directive('belongingTo', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/belonging-to.html'
    };
  })
  .directive('itemCount', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/item-count.html'
    };
  })
  .directive('listOptions', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/list-options.html'
    };
  });
