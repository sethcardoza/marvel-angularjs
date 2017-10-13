comicsApp.controller('StoriesController', function($location, $q, $routeParams, $scope, StoriesService) {
    var busy = false;
    var data = null;
    var deferred = $q.defer();
    var id;
    var max = false;
    var offset = 0;
    var params;
    var paramsChanged = false;
    var self = this;

    $scope.stories = [];
    $scope.listOptions = {};
    $scope.infiniteScrollDisabled = false;

    id = $routeParams.id;
    if (typeof id !== 'undefined' && id !== null) {
      StoriesService.getStory(id).then(function(data) {
        console.log(data);
        $scope.story = data;
        $scope.characters = data.characters.items;
        $scope.comics = data.comics.items;
        $scope.creators = data.creators.items;
        $scope.events = data.events.items;
        $scope.series = data.series.items;
      });
    }

    $scope.loadMore = function() {
      if (!busy && !max) {
        busy = true;

        params = {
          offset: offset
        };

        if ($scope.listOptions.startsWith !== '') {
          params.nameStartsWith = $scope.listOptions.startsWith;
        } else {
          delete params.nameStartsWith;
        }

        StoriesService.getStoriesList(params).then(function(data) {

          if (data.count === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.stories = $scope.stories.concat(data.results);
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
          params.nameStartsWith = $scope.listOptions.startsWith;
        } else {
          delete params.nameStartsWith;
        }

        StoriesService.getStoriesList(params).then(function(data) {
          if (data.length === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.stories = data.results;
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
}).directive('storiesList', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/stories/list.html'
  };
});
