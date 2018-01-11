/* eslint-env jasmine */
describe('CharactersNormalizerFactory', function () {
  beforeEach(module('marvelApp'));

  var CharactersNormalizerFactory;

  beforeEach(angular.mock.module('marvelApp.characters'));

  beforeEach(inject(function (_CharactersNormalizerService_) {
    CharactersNormalizerFactory = _CharactersNormalizerService_;
  }));

  it('should be defined', function () {
    expect(CharactersNormalizerFactory).toBeDefined();
  });

  describe('.normalize()', function () {
    var actual;
    var expected = {
      description: 'This is the description',
      title: 'This is the title'
    };
    var dataMock = {
      description: 'This is the description',
      name: 'This is the title'
    };

    it('should exist', function () {
      expect(CharactersNormalizerFactory.normalize).toBeDefined();
    });

    it('should return normalized data', function () {
      actual = CharactersNormalizerFactory.normalize(dataMock);
      expect(actual).toEqual(expected);
    });

    it('should return normalized data from bad data', function () {
      expected = {};
      dataMock = {
        title: 'This is the title'
      };
      actual = CharactersNormalizerFactory.normalize(dataMock);
      expect(actual).toEqual(expected);
    });
  });
});
