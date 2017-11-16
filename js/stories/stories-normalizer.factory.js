(function() {
  'use strict';

  angular
  .module('marvelApp.stories')
  .factory('StoriesNormalizerService', [function () {
    var vm = this;

    vm.normalize = function (data) {
      var story = {};

      if (data.description) {
        story.description = data.description;
      }

      if (data.title) {
        story.title = data.title;
      }

      return story;
    };

    return vm;
  }]);
})();
