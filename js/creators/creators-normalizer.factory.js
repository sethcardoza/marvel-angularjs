(function () {
  'use strict';

  angular
  .module('marvelApp.creators')
  .factory('CreatorsNormalizerService', [function () {
    var vm = this;

    vm.normalize = function (data) {
      var creator = {};

      if (data.description) {
        creator.description = data.description;
      }

      if (data.fullName) {
        creator.title = data.fullName;
      }

      return creator;
    };

    return vm;
  }]);
})();
