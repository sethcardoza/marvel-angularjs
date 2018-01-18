/* eslint-env jasmine */
describe('EventsController', function () {
  beforeEach(module('marvelApp'));

  var $controller;
  var $rootScope;
  var EventsController;

  beforeEach(angular.mock.module('marvelApp.events'));

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    EventsController = $controller('EventsController', {
      $scope: $rootScope
    });
  }));

  it('should be defined', function () {
    expect(EventsController).toBeDefined();
  });
});
