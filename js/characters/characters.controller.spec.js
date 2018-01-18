/* eslint-env jasmine */
describe('CharactersController', function () {
  beforeEach(module('marvelApp'));

  var $controller;
  var $rootScope;
  var CharactersController;

  beforeEach(angular.mock.module('marvelApp.characters'));

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    CharactersController = $controller('CharactersController', {
      $scope: $rootScope
    });
  }));

  it('should be defined', function () {
    expect(CharactersController).toBeDefined();
  });
});
