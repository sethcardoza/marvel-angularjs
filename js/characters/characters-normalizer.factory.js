(function() {
  'use strict';

  angular
  .module('marvelApp.characters')
  .factory('CharactersNormalizerService', [function () {
    var vm = this;

    vm.normalize = function (data) {
      var character = {};

      if (data.description) {
        character.description = data.description;
      }

      if (data.name) {
        character.title = data.name;
      }

      return character;
    };

    return vm;
  }]);
})();
