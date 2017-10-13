'use strict';

var comicsApp = angular.module('comicsApp', ['ngRoute', 'infinite-scroll'])
  // allow DI for use in controllers, unit tests
  .constant('_', window._)
  // use in views, ng-repeat="x in _.range(3)"
  .run(function ($rootScope) {
     $rootScope._ = window._;
  });
