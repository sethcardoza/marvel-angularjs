comicsApp.controller('EventsController', function($location, $q, $routeParams, $scope, EventsService) {
    var busy = false;
    var data = null;
    var deferred = $q.defer();
    var id;
    var max = false;
    var offset = 0;
    var self = this;

    $scope.events = [];
    $scope.infiniteScrollDisabled = false;

    id = $routeParams.id;
    if (typeof id !== 'undefined' && id !== null) {
      EventsService.getEvent(id).then(function(data) {
        console.log(data);
        $scope.event = data;
        $scope.comics = data.comics.items;
        $scope.creators = data.creators.items;
        $scope.series = data.series.items;
        $scope.stories = data.stories.items;
      });
    }

    $scope.loadMore = function() {
      if (!busy && !max) {
        busy = true;
        EventsService.getEventsList({offset: offset}).then(function(data) {
          if (data.count === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.events = $scope.events.concat(data.results);
          $scope.total = data.total;
          offset += data.count;
          busy = false;
        });
      }
    };

    $scope.formatDate = function(date) {
      var dateOut = new Date(date);
      return dateOut;
    };

    $scope.getIdFromResoureLink = function(link) {
      var id;
      var parts = link.split('/');

      id = parts.pop();

      return id;
    };
}).directive('eventsList', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/events/list.html'
  };
});
