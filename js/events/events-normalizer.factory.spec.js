describe('EventsNormalizerFactory', function () {
  beforeEach(module('marvelApp'));

  var EventsNormalizerFactory;

  beforeEach(angular.mock.module('marvelApp.events'));

  beforeEach(inject(function (_EventsNormalizerService_) {
    EventsNormalizerFactory = _EventsNormalizerService_;
  }));

  it('should be defined', function () {
    expect(EventsNormalizerFactory).toBeDefined();
  });

  describe('.normalize()', function () {
    var actual;
    var expected = {
      description: 'This is the description',
      end: 833587200000,
      start: 794016000000,
      title: 'This is the title'
    };
    var dataMock = {
      description: 'This is the description',
      end: '1996-06-01',
      start: '1995-03-01',
      title: 'This is the title'
    };

    it('should exist', function () {
      expect(EventsNormalizerFactory.normalize).toBeDefined();
    });

    it('should return normalized data', function () {
      actual = EventsNormalizerFactory.normalize(dataMock);
      expect(actual).toEqual(expected);
    });

    it('should return normalized data from bad data', function () {
      expected = {};
      dataMock = {
        name: 'This is the title'
      };
      actual = EventsNormalizerFactory.normalize(dataMock);
      expect(actual).toEqual(expected);
    });
  });
});
