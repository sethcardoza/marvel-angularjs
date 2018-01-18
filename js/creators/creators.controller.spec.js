/* eslint-env jasmine */
describe('CreatorsController', function () {
  beforeEach(module('marvelApp'));

  var $controller;
  var $rootScope;
  var CreatorsController;

  beforeEach(angular.mock.module('marvelApp.creators'));

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    CreatorsController = $controller('CreatorsController', {
      $scope: $rootScope
    });
  }));

  it('should be defined', function () {
    expect(CreatorsController).toBeDefined();
  });
});
