var bharat = angular.module('bharat', ['ionic','ngCordova']);

bharat.run(function($ionicPlatform, $ionicSideMenuDelegate,$cordovaCapture) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    
      
   /*   var options = { limit: 3, duration: 10 };

    $cordovaCapture.captureAudio(options).then(function(audioData) {
      // Success! Audio data is here
        console.log("CAPTURE SUCCESS");
        alert("audio success");
    }, function(err) {
      // An error occurred. Show a message to the user
         console.log("CAPTURE ERROR :",JSON.stringify(err));
        alert("audio failure");
    });
     */ 
     
     
       
      
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})


bharat.config(function($stateProvider, $urlRouterProvider) {

  
  $stateProvider

 
  .state('bharat', {
    url: '/bharat',
    templateUrl: 'view/starter.html'
  })

   .state('getuserdetail', {
        url: '/getuserdetail',
        templateUrl: 'view/userdetail.html',
        controller: 'usersController'
  })
    
   .state('uploadimage', {
        url: '/uploadimage',
        templateUrl: 'view/imageupload.html',
        controller: 'usersController'
  })

 
  $urlRouterProvider.otherwise('/bharat');

});
