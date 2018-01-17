/* eslint-env jasmine */
(function () {
  'use strict';

  describe('MarvelApp', function () {
    var $compile;
    var $rootScope;
    var $scope;
    var element;
    var html;

    beforeEach(module('marvelApp'));
    beforeEach(module('automatedTest.templates'));

    describe('belonging-to directive', function () {
      beforeEach(inject(function (_$compile_, _$rootScope_) {

        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();

        // element will enable you to test your directive's element on the DOM
        element = $compile('<belonging-to></belonging-to>')($scope);

        // Digest needs to be called to set any values on the directive's scope
        $scope.$digest();
      }));

      it('Should load the template', function () {
        html = element.html();
        expect(html).toContain('belongingTo');
      });

      it('Should replace the keys with text', function () {
        $scope.belongingTo = {
          id: 123,
          title: 'Spider-Man',
          type: 'comic'
        };
        $scope.$digest();
        html = element.html();
        expect(html).toContain($scope.belongingTo.id);
        expect(html).toContain($scope.belongingTo.title);
        expect(html).toContain($scope.belongingTo.type);
      });
    });

    describe('item-count directive', function () {
      beforeEach(inject(function (_$compile_, _$rootScope_) {

        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();

        // element will enable you to test your directive's element on the DOM
        element = $compile('<item-count></item-count>')($scope);

        // Digest needs to be called to set any values on the directive's scope
        $scope.$digest();
      }));

      it('Should load the template', function () {
        html = element.html();
        expect(html).toContain('class="count"');
      });

      it('Should replace the keys with text', function () {
        $scope.total = 10;
        $scope.$digest();
        html = element.html();
        expect(html).toContain($scope.total);
      });
    });

    describe('list-options directive', function () {
      beforeEach(inject(function (_$compile_, _$rootScope_) {

        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();

        // element will enable you to test your directive's element on the DOM
        element = $compile('<list-options></list-options>')($scope);

        // Digest needs to be called to set any values on the directive's scope
        $scope.$digest();
      }));

      it('Should load the template', function () {
        html = element.html();
        expect(html).toContain('listOptions');
      });
    });
  });
})();
