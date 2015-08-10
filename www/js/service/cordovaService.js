bharat.service('CordovaService', function() {
  document.addEventListener("deviceready", function() {
    console.log('** cordova ready **');
      alert("Listening");
  }, false);
});