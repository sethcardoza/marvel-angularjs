comicsApp.factory('SeriesNormalizerService', [function() {
    var vm = this;

    vm.normalize = function(data) {
      var series = {};

      if (data.description) {
        series.description = data.description;
      }

      if (data.title) {
        series.title = data.title;
      }

      if (data.startYear) {
        series.startYear = data.startYear;
      }

      if (data.endYear) {
        series.endYear = data.endYear;
        if (series.endYear === '2099') {
          series.endYear = 'Current';
        }
      }

      return series;
    }

    return vm;
  }
]);
