/* eslint-env jasmine */
describe('MarvelService', function () {
  beforeEach(module('marvelApp'));

  var MarvelFactory;

  beforeEach(angular.mock.module('marvelApp'));

  beforeEach(inject(function (_MarvelService_) {
    MarvelFactory = _MarvelService_;
  }));

  it('should be defined', function () {
    expect(MarvelFactory).toBeDefined();
  });

  describe('.getList()', function () {
    it('should exist', function () {
      expect(MarvelFactory.getList).toBeDefined();
    });
  });

  describe('.getItem()', function () {
    it('should exist', function () {
      expect(MarvelFactory.getItem).toBeDefined();
    });
  });
});
