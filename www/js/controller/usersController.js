(function(){
    bharat.controller('usersController', ['$q','$timeout','$scope','usersService','$ionicModal','$cordovaCamera', '$cordovaFile','$cordovaCapture',usersController]); 
    
    function usersController($q,$timeout,$scope,usersService,$ionicModal,$cordovaCamera,$cordovaFile,$cordovaCapture)
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
                quality: 75,
                destinationType: Camera.DestinationType.FILE_URI,
                 sourceType: Camera.PictureSourceType.CAMERA,
                 encodingType: Camera.EncodingType.JPEG,
                 allowEdit: false,
             };
             $cordovaCamera.getPicture(cameraOptions).then(function(imageData) {
                
             alert("IMGDATA"+imageData);     
            
             onImageSuccess(imageData);

             function onImageSuccess(fileURI) {
             $scope.imgURI.push(fileURI);     
             createFileEntry(fileURI);
                 
             }

             function createFileEntry(fileURI) {
                 alert("FILEURI"+fileURI);     
             window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
             }

            
             function copyFile(fileEntry) 
             {
             var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
             var newName = makeid() + name;
             alert("NEWFILE"+newName);        
             window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) 
             {
             fileEntry.copyTo(fileSystem2,newName,onCopySuccess,fail);
                  alert("FILESYS"+cordova.file.dataDirectory);  
             },fail);
             }

             // 6
             function onCopySuccess(entry) {
             $scope.$apply(function () {
             $scope.images.push(entry.nativeURL);
                 alert("COPYSUCCESS"+entry.nativeURL);
             });
             }

             function fail(error) {
             console.log("fail: " + error.code);
                  alert("COPYFAILURE"+error);
             }

             function makeid() {
             var text = "";
             var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

             for (var i=0; i < 5; i++) {
             text += possible.charAt(Math.floor(Math.random() * possible.length));
             }
             return text;
             }

             }, function(err) {
             console.log(err);
             });
                    
            $scope.modal.hide();
     };
        
     $scope.removeImage = function(index)
     {
          $scope.imgURI.splice(index,1);
     }
 
 
     $scope.captureAudio = function()
     {
          var captureSuccess = function(mediaFiles) 
          {
               alert("SUCCESS");
                var i, path, len;
                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    path = mediaFiles[i].fullPath;
                }
          };

            var captureError = function(error) {
                 alert("ERROR");
                navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
            };
         
            navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:2}); 
     }
 
        
    }
    
}());