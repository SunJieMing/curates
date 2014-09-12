angular.module('curates.singleCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('singleCollection', {
      url: '/collections/:url',
      templateUrl: 'modules/singleCollection/singleCollection.html'
    })
})

.controller('singleCollectionController', function($scope, $state, $stateParams, collectionFactory, Auth) {
  var url = $stateParams.url;
  $scope.notYetUpvoted = true;
  $scope.collection = {};
  $scope.isUser = false;

  collectionFactory.getCollection(url).then(function(collection) {
    if (collection != null) {
      $scope.isUser = Auth.isAuth().data === "OK";
         // Auth.user.provider === collection.user.provider
      $scope.collection = collection;
    }
  });

  $scope.upVote = function() {
    $scope.collection.stars++;
    collectionFactory.updateCollection($scope.collection);
    $scope.notYetUpvoted = false;
  };

  $scope.clone = function() {
    $state.go('createCollection', {
      url: $scope.collection.url
    });
  };
});
