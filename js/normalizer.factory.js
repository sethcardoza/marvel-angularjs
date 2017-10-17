comicsApp.factory('NormalizerService', [
  'CharactersNormalizerService',
  'ComicsNormalizerService',
  'CreatorsNormalizerService',
  'EventsNormalizerService',
  'SeriesNormalizerService',
  'StoriesNormalizerService',
  function (
    CharactersNormalizerService,
    ComicsNormalizerService,
    CreatorsNormalizerService,
    EventsNormalizerService,
    SeriesNormalizerService,
    StoriesNormalizerService
  ) {
    var vm = this;

    function getIdFromResourceUri (link) {
      var id;
      var parts;

      parts = link.split('/');
      id = parts.pop();

      return id;
    }

    vm.normalize = function (type, data) {
      var character;
      var characters;
      var comic;
      var comics;
      var creator;
      var creators;
      var eventItem;
      var events;
      var i;
      var item = {};
      var seriesItem;
      var series;
      var story;
      var stories;

      switch (type) {
        case 'characters':
          item = CharactersNormalizerService.normalize(data);
          break;
        case 'comics':
          item = ComicsNormalizerService.normalize(data);
          break;
        case 'creators':
          item = CreatorsNormalizerService.normalize(data);
          break;
        case 'events':
          item = EventsNormalizerService.normalize(data);
          break;
        case 'series':
          item = SeriesNormalizerService.normalize(data);
          break;
        case 'stories':
          item = StoriesNormalizerService.normalize(data);
          break;
        default:
          item = data;
          break;
      }

      if (data.id) {
        item.id = data.id;
      }

      if (data.thumbnail && data.thumbnail.path && data.thumbnail.extension) {
        item.thumbnail = data.thumbnail.path + '.' + data.thumbnail.extension;
      }

      item.characters = [];
      if (data.characters) {
        characters = data.characters.items;
        for (i = 0; i < characters.length; i++) {
          character = {};

          character.id = getIdFromResourceUri(characters[i].resourceURI);
          character.title = characters[i].name;
          item.characters.push(character);
        }
        item.charactersTotal = data.characters.available;
      }

      item.comics = [];
      if (data.comics) {
        comics = data.comics.items;
        for (i = 0; i < comics.length; i++) {
          comic = {};
          comic.id = getIdFromResourceUri(comics[i].resourceURI);
          comic.title = comics[i].name;
          item.comics.push(comic);
        }
        item.comicsTotal = data.comics.available;
      }

      item.creators = [];
      if (data.creators) {
        creators = data.creators.items;
        for (i = 0; i < creators.length; i++) {
          creator = {};
          creator.id = getIdFromResourceUri(creators[i].resourceURI);
          creator.title = creators[i].name;
          item.creators.push(creator);
        }
        item.creatorsTotal = data.creators.available;
      }

      item.events = [];
      if (data.events) {
        events = data.events.items;
        for (i = 0; i < events.length; i++) {
          eventItem = {};
          eventItem.id = getIdFromResourceUri(events[i].resourceURI);
          eventItem.title = events[i].name;
          item.events.push(eventItem);
        }
        item.eventsTotal = data.events.available;
      }

      item.series = [];
      if (data.series) {
        if (data.series.items) {
          series = data.series.items;
        } else {
          // comics belong to a single series
          series = [data.series];
        }
        for (i = 0; i < series.length; i++) {
          seriesItem = {};
          seriesItem.id = getIdFromResourceUri(series[i].resourceURI);
          seriesItem.title = series[i].name;
          item.series.push(seriesItem);
        }
        item.seriesTotal = data.series.available;
      }

      item.stories = [];
      if (data.stories) {
        stories = data.stories.items;
        for (i = 0; i < stories.length; i++) {
          story = {};
          story.id = getIdFromResourceUri(stories[i].resourceURI);
          story.title = stories[i].name;
          item.stories.push(story);
        }
        item.storiesTotal = data.stories.available;
      }

      return item;
    };

    return vm;
  }
]);
