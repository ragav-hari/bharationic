(function(){
    bharat.controller('contentController', ['$ionicSideMenuDelegate','$timeout','$scope', contentController]); 
    

function contentController($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
}
    
}());