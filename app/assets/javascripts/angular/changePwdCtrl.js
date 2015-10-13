Blog.controller('changePwdCtrl', ['Auth', '$scope', '$location', '$rootScope',
	function(Auth, $scope, $location, $rootScope) {
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
	        Auth.login($scope.loginData, config).then(function(user) {
	            //console.log(user); // => {id: 1, ect: '...'}
	            $location.path("/portfolio");
              $rootScope.currentUser = user;
              $rootScope.notifyMsg = "Successfully signed in user";
	            //alert("Successfully signed in user");
	        }, function(error) {
	            // Authentication failed...
	          console.info('Error in authenticating user!');
	          alert('Error in signing in user!');
            console.log(error);
	        });
        }


        $scope.$on('devise:login', function(event, currentUser) {
            // after a login, a hard refresh, a new tab
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            // user logged in by Auth.login({...})
        });
	}
]);