/* eslint-env jasmine */
describe('SeriesController', function () {
  beforeEach(module('marvelApp'));

  var $controller;
  var $rootScope;
  var SeriesController;

  beforeEach(angular.mock.module('marvelApp.series'));

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    SeriesController = $controller('SeriesController', {
      $scope: $rootScope
    });
  }));

  it('should be defined', function () {
    expect(SeriesController).toBeDefined();
  });
});
