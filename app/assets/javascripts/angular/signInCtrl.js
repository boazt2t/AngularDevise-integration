Blog.controller('signInCtrl', ['Auth', '$scope', '$location', '$rootScope', 'flash',
	function(Auth, $scope, $location, $rootScope, flash) {

        $rootScope.flash = flash;

        // Use your configured Auth service.
        $scope.loginData = {
            email: '',
            password: ''
        };

        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };

        $scope.signIn = function() {
          
          $scope.$broadcast('show-errors-check-validity');
          if ($scope.loginForm.$invalid)  return; 

	        Auth.login($scope.loginData, config).then(function(user) {
	            
              $rootScope.currentUser = user;
              flash.setMessage("Successfully signed in user");

	            $location.path("/portfolio");
	        }, function(error) {
	            // Authentication failed...
            console.log(error);
            $scope.err = error.data.errors;
            $scope.$broadcast('show-errors-check-validity');
	        });
        }


        $scope.$on('devise:login', function(event, currentUser) {
            // after a login, a hard refresh, a new tab
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            // user logged in by Auth.login({...})
        });

        /*Auth.currentUser().then(function(user) {
            console.log(user); // => {id: 1, ect: '...'}
            $rootScope.currentUser = user;
        }, function(error) {
            // unauthenticated error
            $rootScope.currentUser = null;
        });*/
	}
]);

