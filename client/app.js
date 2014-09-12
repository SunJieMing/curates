angular.module('curates', [
  'ui.router',
  'curates.auth',
  'curates.authFactory',
  'curates.collectionsList',
  'curates.myCollections',
  'curates.createCollection',
  'curates.singleCollection',
  'curates.editCollection',
  'curates.collectionFactory',
  'ui.bootstrap'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  // $urlRouterProvider.otherwise('/');
  $stateProvider
  	.state('/signin', {
  		url: '/signin',
  		templateUrl: 'services/auth/signin.html',
  		controller: 'AuthController'
  	})
  	.state('/signup', {
  		url: '/signup',
  		templateUrl: 'services/auth/signup.html',
  		controller: 'AuthController'
  	})

  	$urlRouterProvider.otherwise('/');

  	$httpProvider.interceptors.push('AttachTokens');
})
.factory ('AttachTokens', function ($window){
	var attach = {
		request: function (config){
			var jwt = $window.localStorage.getItem('com.curates');
			if (jwt){
				config.headers['x-access-token'] = jwt;
			}
			config.headers['Allow-Control-Allow-Origin'] = '*';
			return config;
		}
	};
	return attach;
})
.run (function ($rootScope, $state, Auth){
		$rootScope.$on('$routeChangeStart', function (evt, next, current){ //this is angular middleware, which whenever you change your page triggers this
		if (next.$$route.controller && next.$$route.controller !== 'AuthController'){
			Auth.isAuth()
				.then(function(){
					console.log('User is Authenticated');
				})
				.catch(function(){
					$state.go('signin');
				});
		}
	});
});

