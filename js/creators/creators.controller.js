comicsApp.controller('CreatorsController', function($location, $q, $routeParams, $scope, CreatorsService) {
    var busy = false;
    var data = null;
    var deferred = $q.defer();
    var id;
    var max = false;
    var offset = 0;
    var params;
    var paramsChanged = false;
    var self = this;

    $scope.creators = [];
    $scope.listOptions = {};
    $scope.infiniteScrollDisabled = false;
    $scope.currentItemType = 'creators';

    id = $routeParams.id;
    $scope.currentItemId = id;
    if (typeof id !== 'undefined' && id !== null) {
      CreatorsService.getCreator(id).then(function(data) {
        console.log(data);
        $scope.creator = data;
        $scope.comics = data.comics.items;
        $scope.events = data.events.items;
        $scope.series = data.series.items;
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
          params.nameStartsWith = $scope.listOptions.startsWith;
        } else {
          delete params.nameStartsWith;
        }

        CreatorsService.getCreatorsList(params).then(function(data) {

          if (data.count === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.creators = $scope.creators.concat(data.results);
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

        CreatorsService.getCreatorsList(params).then(function(data) {
          if (data.length === 0) {
            max = true;
            $scope.infiniteScrollDisabled = true;
          }
          $scope.creators = data.results;
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
}).directive('creatorsList', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/creators/list.html'
  };
});
