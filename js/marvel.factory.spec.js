/* eslint-env jasmine */
describe('MarvelService', function () {
  beforeEach(module('marvelApp'));

  var $httpBackend;
  var MarvelFactory;
  // var comics = {
  //   comics: []
  // };

  beforeEach(angular.mock.module('marvelApp'));

  beforeEach(inject(function (_MarvelService_, $injector) {
    MarvelFactory = _MarvelService_;

    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', 'http://gateway.marvel.com/v1/public/comics')
      .respond({comics: []});
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be defined', function () {
    expect(MarvelFactory).toBeDefined();
  });

  describe('.getList()', function () {
    it('should exist', function () {
      expect(MarvelFactory.getList).toBeDefined();
    });

    it('should get a list of items', function () {
      MarvelFactory.getList('comics');
      // $httpBackend.expectGet('http://gateway.marvel.com/v1/public/comics');
      // $httpBackend.flush();
    });
  });

  describe('.getItem()', function () {
    it('should exist', function () {
      expect(MarvelFactory.getItem).toBeDefined();
    });

    it('should get an item', function () {
      expect(MarvelFactory.getItem()).not.toBeNull();
    });
  });
});
