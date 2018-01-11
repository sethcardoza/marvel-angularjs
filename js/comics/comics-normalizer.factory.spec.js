/* eslint-env jasmine */
describe('ComicsNormalizerFactory', function () {
  beforeEach(module('marvelApp'));

  var ComicsNormalizerFactory;

  beforeEach(angular.mock.module('marvelApp.comics'));

  beforeEach(inject(function (_ComicsNormalizerService_) {
    ComicsNormalizerFactory = _ComicsNormalizerService_;
  }));

  it('should be defined', function () {
    expect(ComicsNormalizerFactory).toBeDefined();
  });

  describe('.normalize()', function () {
    var actual;
    var expected = {
      description: 'This is the description',
      title: 'This is the title'
    };
    var dataMock = {
      description: 'This is the description',
      title: 'This is the title'
    };

    it('should exist', function () {
      expect(ComicsNormalizerFactory.normalize).toBeDefined();
    });

    it('should return normalized data', function () {
      actual = ComicsNormalizerFactory.normalize(dataMock);
      expect(actual).toEqual(expected);
    });

    it('should return normalized data from bad data', function () {
      expected = {};
      dataMock = {
        name: 'This is the title'
      };
      actual = ComicsNormalizerFactory.normalize(dataMock);
      expect(actual).toEqual(expected);
    });
  });
});
