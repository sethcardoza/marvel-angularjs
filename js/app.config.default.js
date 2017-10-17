angular.module('comicsApp', []).
  config(function($provide) {
    $provide.constant('MARVEL_API_KEY', '--YOUR-PUBLIC-KEY-HERE--');
  });
