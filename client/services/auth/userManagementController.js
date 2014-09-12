angular.module('curates.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth, $rootScope) {
  $scope.user = {};
  $scope.error;
  $rootScope.loggedIn = false;
  $rootScope.user;

  $scope.signin = function() {
   $rootScope.user = $scope.user.username;
   Auth.signin($scope.user)
      .then(function (token) {
        $rootScope.loggedIn = true;
        console.log('from authcontroller rootscope', $rootScope.loggedIn);
        $window.localStorage.setItem('com.curates', token);
        $location.path('/');
      })
      .catch(function (error) {
        var newError = error.data.split('<');
        $scope.error = newError[0];
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.curates', token);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
        var newError = error.data.split('<');
        $scope.error = newError[0];
      });
  };

});
