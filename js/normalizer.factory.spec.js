(function () {
  'use strict';

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
      var defaultExpected = {
        id: 123,
        characters: [],
        comics: [],
        creators: [],
        events: [],
        series: [],
        stories: [],
        thumbnail: '/image.jpg'
      };
      var expected;
      var defaultDataMock = {
        id: 123,
        description: 'This is the description',
        title: 'This is the title',
        startYear: '1995',
        endYear: '2000',
        thumbnail: {
          path: '/image',
          extension: 'jpg'
        }
      };
      var dataMock = Object.assign({}, defaultDataMock);
      var characters = {
        available: 1,
        items: [
          {
            name: 'Spider-Man',
            resourceURI: '/characters/123'
          }
        ]
      };
      var expectedCharacters = [
        {
          id: '123',
          title: 'Spider-Man'
        }
      ];
      var comics = {
        available: 1,
        items: [
          {
            name: 'The Amazing Spider-Man',
            resourceURI: '/comics/123'
          }
        ]
      };
      var expectedComics = [
        {
          id: '123',
          title: 'The Amazing Spider-Man'
        }
      ];
      var creators = {
        available: 1,
        items: [
          {
            name: 'Stan Lee',
            resourceURI: '/creators/1'
          }
        ]
      };
      var expectedCreators = [
        {
          id: '1',
          title: 'Stan Lee'
        }
      ];
      var events = {
        available: 1,
        items: [
          {
            name: 'Secret Wars',
            resourceURI: '/events/123'
          }
        ]
      };
      var expectedEvents = [
        {
          id: '123',
          title: 'Secret Wars'
        }
      ];
      var series = {
        available: 2,
        items: [
          {
            name: 'The Amazing Spider-Man',
            resourceURI: '/series/123'
          },
          {
            name: 'X-Men',
            resourceURI: '/series/456'
          }
        ]
      };
      var expectedSeries = [
        {
          id: '123',
          title: 'The Amazing Spider-Man'
        },
        {
          id: '456',
          title: 'X-Men'
        }
      ];
      var stories = {
        available: 1,
        items: [
          {
            name: 'Grim Hunt',
            resourceURI: '/stories/123'
          }
        ]
      };
      var expectedStories = [
        {
          id: '123',
          title: 'Grim Hunt'
        }
      ];

      it('should exist', function () {
        expect(NormalizerFactory.normalize).toBeDefined();
      });

      it('should return normalized data', function () {
        expected = Object.assign({}, defaultExpected);
        actual = NormalizerFactory.normalize('generic', dataMock);
        expect(actual).toEqual(expected);
      });

      it('should return normalized data for characters', function () {
        expected = Object.assign({}, defaultExpected);
        expected.description = dataMock.description;
        actual = NormalizerFactory.normalize('characters', dataMock);
        expect(actual).toEqual(expected);
      });

      it('should return normalized data for comics', function () {
        expected = Object.assign({}, defaultExpected);
        expected.title = dataMock.title;
        expected.description = dataMock.description;
        actual = NormalizerFactory.normalize('comics', dataMock);
        expect(actual).toEqual(expected);
      });

      it('should return normalized data for creators', function () {
        expected = Object.assign({}, defaultExpected);
        expected.title = dataMock.title;
        expected.description = dataMock.description;
        dataMock.fullName = dataMock.title;
        actual = NormalizerFactory.normalize('creators', dataMock);
        expect(actual).toEqual(expected);
      });

      it('should return normalized data for events', function () {
        expected = Object.assign({}, defaultExpected);
        expected.title = dataMock.title;
        expected.description = dataMock.description;
        actual = NormalizerFactory.normalize('events', dataMock);
        expect(actual).toEqual(expected);
      });

      it('should return normalized data for series', function () {
        expected = Object.assign({}, defaultExpected);
        expected.title = dataMock.title;
        expected.description = dataMock.description;
        expected.startYear = dataMock.startYear;
        expected.endYear = dataMock.endYear;
        actual = NormalizerFactory.normalize('series', dataMock);
        expect(actual).toEqual(expected);
      });

      it('should return normalized data for stories', function () {
        expected = Object.assign({}, defaultExpected);
        expected.title = dataMock.title;
        expected.description = dataMock.description;
        actual = NormalizerFactory.normalize('stories', dataMock);
        expect(actual).toEqual(expected);
      });

      it('should return normalized data for item having characters', function () {
        expected = Object.assign({}, defaultExpected);
        dataMock.characters = characters;
        expected.charactersTotal = characters.available;
        expected.characters = expectedCharacters;
        actual = NormalizerFactory.normalize('generic', dataMock);
        expect(actual).toEqual(expected);
      });

      it('should return normalized data for item having comics', function () {
        expected = Object.assign({}, defaultExpected);
        dataMock = Object.assign({}, defaultDataMock);
        dataMock.comics = comics;
        expected.comicsTotal = comics.available;
        expected.comics = expectedComics;
        actual = NormalizerFactory.normalize('generic', dataMock);
        expect(actual).toEqual(expected);
      });

      it('should return normalized data for item having creators', function () {
        expected = Object.assign({}, defaultExpected);
        dataMock = Object.assign({}, defaultDataMock);
        dataMock.creators = creators;
        expected.creatorsTotal = creators.available;
        expected.creators = expectedCreators;
        actual = NormalizerFactory.normalize('generic', dataMock);
        expect(actual).toEqual(expected);
      });

      it('should return normalized data for item having events', function () {
        expected = Object.assign({}, defaultExpected);
        dataMock = Object.assign({}, defaultDataMock);
        dataMock.events = events;
        expected.eventsTotal = events.available;
        expected.events = expectedEvents;
        actual = NormalizerFactory.normalize('generic', dataMock);
        expect(actual).toEqual(expected);
      });

      it('should return normalized data for item having a single', function () {
        expected = Object.assign({}, defaultExpected);
        dataMock = Object.assign({}, defaultDataMock);
        dataMock.series = series.items.pop();
        dataMock.series.available = 1;
        expected.seriesTotal = 1;
        expected.series = [expectedSeries.pop()];
        actual = NormalizerFactory.normalize('generic', dataMock);
        expect(actual).toEqual(expected);
      });

      it('should return normalized data for item having series', function () {
        expected = Object.assign({}, defaultExpected);
        dataMock = Object.assign({}, defaultDataMock);
        dataMock.series = series;
        expected.seriesTotal = series.available;
        expected.series = expectedSeries;
        actual = NormalizerFactory.normalize('generic', dataMock);
        expect(actual).toEqual(expected);
      });

      it('should return normalized data for item having stories', function () {
        expected = Object.assign({}, defaultExpected);
        dataMock = Object.assign({}, defaultDataMock);
        dataMock.stories = stories;
        expected.storiesTotal = stories.available;
        expected.stories = expectedStories;
        actual = NormalizerFactory.normalize('generic', dataMock);
        expect(actual).toEqual(expected);
      });
    });
  });
})();
