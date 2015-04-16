angular.module('app', [
  'ngAnimate',
  'ngTouch',
  'ngSanitize',
  'ngResource',
  'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
  $routeProvider.caseInsensitiveMatch = true;
  $routeProvider
    .when('/', {
      templateUrl: 'common/list/list.controller.tpl.html',
      controller: 'ListController',
      controllerAs:'model'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true).hashPrefix('!');
});

