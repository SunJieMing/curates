angular.module('curates.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.error;

  $scope.signin = function() {
   Auth.signin($scope.user)
      .then(function (token) {
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
