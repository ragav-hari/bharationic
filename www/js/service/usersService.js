(function(){
    
     bharat.factory('usersService',['$q','$http',usersService]);
    
     function usersService($q,$http)
     {
        return{
            registerUser   :  registerUser
        };
         
        function registerUser(data)
        {
            return $http({
                method : 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url    : 'localhost/bharatration/adduser.php',  
                cache  : false,
                data   : $.param({user_detail:  data})
              })
              .then(registerUserRespose);     
        }
         
         
        function registerUserRespose(response)
         {
             return response;
         }
     }
    
}());