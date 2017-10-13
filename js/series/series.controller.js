comicsApp.controller('SeriesController', function($location, $q, $routeParams, $scope, SeriesService) {
    var busy = false;
    var data = null;
    var deferred = $q.defer();
    var id;
    var max = false;
    var offset = 0;
    var params;
    var paramsChanged = false;
    var self = this;

    $scope.series = [];
    $scope.listOptions = {};
    $scope.infiniteScrollDisabled = false;

    id = $routeParams.id;
    if (typeof id !== 'undefined' && id !== null) {
      SeriesService.getSeries(id).then(function(data) {
        console.log(data);
        $scope.series = data;
        $scope.characters = data.characters.items;
        $scope.comics = data.comics.items;
        $scope.creators = data.creators.items;
        $scope.events = data.events.items;
        $scope.stories = data.stories.items;
      });
    }

    $scope.loadMore = function() {
      if (!busy && !max) {
        busy = true;

        params = {
          offset: offset
        };

        if ($scope.listOptions.startsWith !== '') {
          params.titleStartsWith = $scope.listOptions.startsWith;
        } else {
          delete params.titleStartsWith;
        }

        SeriesService.getSeriesList(params).then(function(data) {
          if (data.count === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.series = $scope.series.concat(data.results);
          $scope.total = data.total;
          offset += data.count;
          busy = false;
        });
      }
    };

    $scope.filter = function() {
      if (!busy && !max) {
        busy = true;

        params = {
          offset: 0,
        };

        if ($scope.listOptions.startsWith !== '') {
          params.titleStartsWith = $scope.listOptions.startsWith;
        } else {
          delete params.titleStartsWith;
        }

        SeriesService.getSeriesList(params).then(function(data) {
          if (data.count === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.series = data.results;
          $scope.total = data.total;
          offset = data.count;
          busy = false;
        });
      }
    };

    $scope.formatDate = function(date){
      var dateOut = new Date(date);
      return dateOut;
    };

    $scope.getIdFromResoureLink = function(link) {
      var id;
      var parts = link.split('/');

      id = parts.pop();

      return id;
    };
}).directive('seriesList', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/series/list.html'
  };
});
