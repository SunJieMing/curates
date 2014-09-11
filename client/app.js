angular.module('curates', [
  'ui.router',
  'curates.collectionsList',
  'curates.myCollections',
  'curates.createCollection',
  'curates.singleCollection',
  'curates.editCollection',
  'curates.services',
  'curates.collectionFactory',
  'ui.bootstrap'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

});
