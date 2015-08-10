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
                 alert("SUCCESS");
               //   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, filefail);
            // $scope.imgURI.push(fileURI);     
             createFileEntry(fileURI);
                 
             }
            
            
                 
            function gotFS(fileSystem) {
           alert("FS"+json.stringify(fileSystem));    
           fileSystem.root.getDirectory("bharat-ration", {create: true}, gotDir);
        }        
                 
        function filefail(error)
                 {
                     alert("FAIL"+json.stringify(error));
                 }         

             function createFileEntry(fileURI) {
                 alert("FILEURI"+fileURI);     
                 console.log("FILEURI"+fileURI);
               /*  window.resolveLocalFileSystemURI(fileURI, function(file) {
                        window.resolveLocalFileSystemURI("file:///data", function(destination) {
                        console.log("moved file from original to data");    
                        file.moveTo(destination,"sample1.jpg");
                        alert("MOVED");    
                        },movefail)
                    },resolvefail);
                 alert("PROCESS DONNE");*/
                 
               window.resolveLocalFileSystemURI(fileURI, function(entry) 
    {
        window.resolveLocalFileSystemURI("file:///storage/emulated/0/Pictures/", 
        function(destination) {
             entry.moveTo(destination,entry.name,movesuccess,movefail);
             alert("FILENAME"+entry.name);
            alert("ENTRY"+JSON.stringify(entry));
        })
    }); 
                 
                 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
    function (fs) {
        fs.root.getDirectory("/Download", {
            create : false,
            exclusive : false
        }, function (dirEntry) { //success
            alert("FSROOT"+dirEntry);
        }, function () {
            //error getDirectory
        });
    },
    function () {
    //error requestFileSystem
    }
);
                 

             }
                                                           
            function movesuccess()
             {
                 alert("MOVE SUCCESS");
             }
                                                           

             function movefail(error)
             {
                     alert("MOVEFAIL"+" "+JSON.stringify(error));
             }
             
             function resolvefail(error)
             {
                     alert("RESOLVEFAIL");
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
         //alert("CALLING");
         /* var captureSuccess = function(mediaFiles) 
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
         
            navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:2}); */
         //var capture = navigator.device.capture;
       

    /*     var options = { limit: 3, duration: 10 };
console.log("LOG:INSIDE");
var val =  $cordovaCapture.captureAudio(options).then(function(audioData) {
        console.log("LOG:Capturing");
     alert("SUCCESS");
    }, function(err) {
      // An error occurred. Show a message to the user
        alert(json.stringify(err));
        
    });
         
         alert("VAL"+val);
            alert("Hello");*/
         
      /*   navigator.device.capture.captureAudio(function (imageURI) {
               scope.$apply(function() {
                  alert(imageURI);
               });
            }, function (err) {
              alert("Error");
            }, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
        
   */
    /*    var options = { limit: 3, duration: 10 };

    $cordovaCapture.captureAudio(options).then(function(audioData) {
      // Success! Audio data is here
        alert("audio success");
    }, function(err) {
      // An error occurred. Show a message to the user
        alert("audio failure");
    });*/
         var media = new Media("src.mp3", null, null, mediaStatusCallback);
$cordovaMedia.play(media);
         
         var mediaStatusCallback = function(status) {
        if(status == 1) {
            alert("STATY",status);
        } else {
            alert("ST",status);
        }
    }



     }
     
       // capture callback

        
    }
    
}());