describe('CreatorsNormalizerFactory', function () {
  beforeEach(module('marvelApp'));

  var CreatorsNormalizerFactory;

  beforeEach(angular.mock.module('marvelApp.creators'));

  beforeEach(inject(function (_CreatorsNormalizerService_) {
    CreatorsNormalizerFactory = _CreatorsNormalizerService_;
  }));

  it('should be defined', function () {
    expect(CreatorsNormalizerFactory).toBeDefined();
  });

  describe('.normalize()', function () {
    var actual;
    var expected = {
      description: 'This is the description',
      title: 'This is the title'
    };
    var dataMock = {
      description: 'This is the description',
      fullName: 'This is the title'
    };

    it('should exist', function () {
      expect(CreatorsNormalizerFactory.normalize).toBeDefined();
    });

    it('should return normalized data', function () {
      actual = CreatorsNormalizerFactory.normalize(dataMock);
      expect(actual).toEqual(expected);
    });

    it('should return normalized data from bad data', function () {
      expected = {};
      dataMock = {
        name: 'This is the title'
      };
      actual = CreatorsNormalizerFactory.normalize(dataMock);
      expect(actual).toEqual(expected);
    });
  });
});
