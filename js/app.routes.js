comicsApp.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider) {

  $routeProvider
    .when('/characters', {
      controller: 'CharactersController',
      templateUrl: 'templates/characters/grid.html'
    })
    .when('/character/:id', {
      controller: 'CharactersController',
      templateUrl: 'templates/characters/details.html'
    })
    .when('/comics', {
      controller: 'ComicsController',
      templateUrl: 'templates/comics/grid.html'
    })
    .when('/comic/:id', {
      controller: 'ComicsController',
      templateUrl: 'templates/comics/details.html'
    })
    .when('/comics/belonging-to/:itemType/:itemId', {
      controller: 'ComicsController',
      templateUrl: 'templates/comics/grid.html'
    })
    .when('/creators', {
      controller: 'CreatorsController',
      templateUrl: 'templates/creators/grid.html'
    })
    .when('/creator/:id', {
      controller: 'CreatorsController',
      templateUrl: 'templates/creators/details.html'
    })
    .when('/', {
      controller: 'EventsController',
      templateUrl: 'templates/events/grid.html'
    })
    .when('/event/:id', {
      controller: 'EventsController',
      templateUrl: 'templates/events/details.html'
    })
    .when('/series', {
      controller: 'SeriesController',
      templateUrl: 'templates/series/grid.html'
    })
    .when('/series/:id', {
      controller: 'SeriesController',
      templateUrl: 'templates/series/details.html'
    })
    .when('/stories', {
      controller: 'StoriesController',
      templateUrl: 'templates/stories/grid.html'
    })
    .when('/story/:id', {
      controller: 'StoriesController',
      templateUrl: 'templates/stories/details.html'
    })
    // removed other routes ... *snip
    .otherwise({
      redirectTo: '/'
    }
  );

  // enable html5Mode for pushstate ('#'-less URLs)
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');

}]);
