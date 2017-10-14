comicsApp.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider) {

  $routeProvider
    .when('/characters', {
      controller: 'CharactersController',
      templateUrl: 'templates/characters/grid.html'
    })
    .when('/characters/:id', {
      controller: 'CharactersController',
      templateUrl: 'templates/characters/details.html'
    })
    .when('/characters/belonging-to/:itemType/:itemId', {
      controller: 'CharactersController',
      templateUrl: 'templates/characters/grid.html'
    })
    .when('/comics', {
      controller: 'ComicsController',
      templateUrl: 'templates/comics/grid.html'
    })
    .when('/comics/:id', {
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
    .when('/creators/:id', {
      controller: 'CreatorsController',
      templateUrl: 'templates/creators/details.html'
    })
    .when('/creators/belonging-to/:itemType/:itemId', {
      controller: 'CreatorsController',
      templateUrl: 'templates/creators/grid.html'
    })
    .when('/', {
      controller: 'EventsController',
      templateUrl: 'templates/events/grid.html'
    })
    .when('/events/:id', {
      controller: 'EventsController',
      templateUrl: 'templates/events/details.html'
    })
    .when('/events/belonging-to/:itemType/:itemId', {
      controller: 'EventsController',
      templateUrl: 'templates/events/grid.html'
    })
    .when('/series', {
      controller: 'SeriesController',
      templateUrl: 'templates/series/grid.html'
    })
    .when('/series/:id', {
      controller: 'SeriesController',
      templateUrl: 'templates/series/details.html'
    })
    .when('/series/belonging-to/:itemType/:itemId', {
      controller: 'SeriesController',
      templateUrl: 'templates/series/grid.html'
    })
    .when('/stories', {
      controller: 'StoriesController',
      templateUrl: 'templates/stories/grid.html'
    })
    .when('/stories/:id', {
      controller: 'StoriesController',
      templateUrl: 'templates/stories/details.html'
    })
    .when('/stories/belonging-to/:itemType/:itemId', {
      controller: 'StoriesController',
      templateUrl: 'templates/stories/grid.html'
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
