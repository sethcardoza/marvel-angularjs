(function() {
  'use strict';

  angular
  .module('marvelApp.events')
  .factory('EventsNormalizerService', [function () {
    var vm = this;

    vm.normalize = function (data) {
      var eventItem = {};

      if (data.description) {
        eventItem.description = data.description;
      }

      if (data.title) {
        eventItem.title = data.title;
      }

      if (data.start) {
        eventItem.start = Date.parse(data.start);
      }

      if (data.end) {
        eventItem.end = Date.parse(data.end);
      }

      return eventItem;
    };

    return vm;
  }]);
})();
