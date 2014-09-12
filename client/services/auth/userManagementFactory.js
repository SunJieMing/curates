angular.module('curates.authFactory', [])
.factory('Auth', function ($http, $location, $window) {

var user = {};

  var signin = function (user){
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp){
      // user.id = resp.data.username;
      return resp.data.token;
    });
  };

  var signup = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp){
      return resp.data.token;
    });
  };

  var isAuth = function (){
    return $http({
      method: 'GET',
      url: '/api/users/signedin'
    }).then(function(data){
      return data;
    })
  };

  var signout = function(){
    $window.localStorage.removeItem('com.curates');
    $location.path('/signin');
  };

  return {
  signin: signin,
  signup: signup,
  isAuth: isAuth,
  signout: signout
  };
});