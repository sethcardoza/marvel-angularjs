(function() {
  'use strict';

  angular
  .module('marvelApp.comics')
  .factory('ComicsNormalizerService', [function () {
    var vm = this;

    vm.normalize = function (data) {
      var comic = {};

      if (data.description) {
        comic.description = data.description;
      }

      if (data.title) {
        comic.title = data.title;
      }

      return comic;
    };

    return vm;
  }]);
})();
