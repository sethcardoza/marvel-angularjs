describe('StoriesNormalizerFactory', function () {
  beforeEach(module('marvelApp'));

  var StoriesNormalizerFactory;

  beforeEach(angular.mock.module('marvelApp.stories'));

  beforeEach(inject(function (_StoriesNormalizerService_) {
    StoriesNormalizerFactory = _StoriesNormalizerService_;
  }));

  it('should be defined', function () {
    expect(StoriesNormalizerFactory).toBeDefined();
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
      expect(StoriesNormalizerFactory.normalize).toBeDefined();
    });

    it('should return normalized data', function () {
      actual = StoriesNormalizerFactory.normalize(dataMock);
      expect(actual).toEqual(expected);
    });

    it('should return normalized data from bad data', function () {
      expected = {};
      dataMock = {
        name: 'This is the title'
      };
      actual = StoriesNormalizerFactory.normalize(dataMock);
      expect(actual).toEqual(expected);
    });
  });
});
