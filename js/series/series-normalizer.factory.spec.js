/* eslint-env jasmine */
describe('SeriesNormalizerFactory', function () {
  beforeEach(module('marvelApp'));

  var SeriesNormalizerFactory;

  beforeEach(angular.mock.module('marvelApp.series'));

  beforeEach(inject(function (_SeriesNormalizerService_) {
    SeriesNormalizerFactory = _SeriesNormalizerService_;
  }));

  it('should be defined', function () {
    expect(SeriesNormalizerFactory).toBeDefined();
  });

  describe('.normalize()', function () {
    var actual;
    var expected = {
      description: 'This is the description',
      title: 'This is the title',
      startYear: '1995',
      endYear: '2000'
    };
    var dataMock = {
      description: 'This is the description',
      title: 'This is the title',
      startYear: '1995',
      endYear: '2000'
    };

    it('should exist', function () {
      expect(SeriesNormalizerFactory.normalize).toBeDefined();
    });

    it('should return normalized data', function () {
      actual = SeriesNormalizerFactory.normalize(dataMock);
      expect(actual).toEqual(expected);
    });

    it('should return normalized data from bad data', function () {
      expected = {};
      dataMock = {
        name: 'This is the title'
      };
      actual = SeriesNormalizerFactory.normalize(dataMock);
      expect(actual).toEqual(expected);
    });

    it('should check if series is current', function () {
      expected = {
        description: 'This is the description',
        title: 'This is the title',
        startYear: '1995',
        endYear: 'Current'
      };
      dataMock = {
        description: 'This is the description',
        title: 'This is the title',
        startYear: '1995',
        endYear: '2099'
      };
      actual = SeriesNormalizerFactory.normalize(dataMock);
      expect(actual).toEqual(expected);
    });
  });
});
