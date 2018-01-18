/* eslint-env jasmine */
describe('ComicsController', function () {
  beforeEach(module('marvelApp'));

  var $controller;
  var $rootScope;
  var ComicsController;

  beforeEach(angular.mock.module('marvelApp.comics'));

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    ComicsController = $controller('ComicsController', {
      $scope: $rootScope
    });
  }));

  it('should be defined', function () {
    expect(ComicsController).toBeDefined();
  });
});
