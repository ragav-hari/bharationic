(function(){
    bharat.controller('usersController', ['$q','$timeout','$scope','usersService','$ionicModal','$cordovaCamera', usersController]); 
    
    function usersController($q,$timeout,$scope,usersService,$ionicModal,$cordovaCamera)
    {
        $scope.user = {};
        $scope.imgURI = [];
        
        // function for user registration
        $scope.registeruser = function()
        {
            console.log("User",$scope.user);
            usersService.registerUser($scope.user).then(function(response){
                console.log("RESP",response);
            });
        }
        
        $scope.attachimage = function()
        {
            
        }
        
        
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
             backdropClickToClose: false
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        
              
        
        $scope.selectimage = function() 
        {
		
            window.imagePicker.getPictures(
                function(results) {
                    for (var i = 0; i < results.length; i++) 
                    {
                        $scope.imgURI.push(results[i]);
                    }
                    if(!$scope.$$phase) 
                    {
                        $scope.$apply();
                    }
                }, function (error) {
                    console.log('Error: ' + error);
                }
               
            );
             $scope.modal.hide();
	   };
        
       $scope.takePicture = function()
       {   
             var cameraOptions = 
             {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL                
             };
            var success = function(data)
            {
                     $scope.$apply(function () {

                       $scope.imgURI.push("data:image/jpeg;base64," + data);
                        console.log("Pushed");
                     });
             };
            var failure = function(message){
                 alert('Failed because: ' + message);
            };

            navigator.camera.getPicture( success , failure , cameraOptions );      
            $scope.modal.hide();
     };
        
     $scope.removeImage = function(index)
     {
          $scope.imgURI.splice(index,1);
     }

        
        
        
    }
    
}());