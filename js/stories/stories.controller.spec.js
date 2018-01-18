/* eslint-env jasmine */
describe('StoriesController', function () {
  beforeEach(module('marvelApp'));

  var $controller;
  var $rootScope;
  var StoriesController;

  beforeEach(angular.mock.module('marvelApp.stories'));

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    StoriesController = $controller('StoriesController', {
      $scope: $rootScope
    });
  }));

  it('should be defined', function () {
    expect(StoriesController).toBeDefined();
  });
});
