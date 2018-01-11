/* eslint-env jasmine */
describe('NormalizerService', function () {
  beforeEach(module('marvelApp'));

  var NormalizerFactory;

  beforeEach(angular.mock.module('marvelApp'));

  beforeEach(inject(function (_NormalizerService_) {
    NormalizerFactory = _NormalizerService_;
  }));

  it('should be defined', function () {
    expect(NormalizerFactory).toBeDefined();
  });

  describe('.normalize()', function () {
    var actual;
    var expected = {
      characters: [],
      comics: [],
      creators: [],
      events: [],
      series: [],
      stories: []
    };
    var dataMock = {
      description: 'This is the description',
      title: 'This is the title',
      startYear: '1995',
      endYear: '2000'
    };

    it('should exist', function () {
      expect(NormalizerFactory.normalize).toBeDefined();
    });

    it('should return normalized data', function () {
      actual = NormalizerFactory.normalize('generic', dataMock);
      expect(actual).toEqual(expected);
    });
  });
});
