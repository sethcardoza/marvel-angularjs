comicsApp.factory('EventsNormalizerService', [function () {
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
      eventItem.start = new Date(data.start);
    }

    if (data.end) {
      eventItem.end = new Date(data.end);
    }

    return eventItem;
  };

  return vm;
}]);
