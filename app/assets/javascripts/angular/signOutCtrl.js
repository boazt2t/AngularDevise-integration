Blog.controller('signOutCtrl', ['Auth', '$scope', '$location',
	function(Auth, $scope, $location) {
        // Use your configured Auth service.
        $scope.credentials = {
            email: '',
            password: ''
        };

        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };

        $scope.signIn = function() {
	        Auth.login($scope.credentials, config).then(function(user) {
	            //console.log(user); // => {id: 1, ect: '...'}
	            $location.path("/portfolio");
	            alert("Successfully signed in user");
	            console.log("aaaa");
	        }, function(error) {
	            // Authentication failed...
	          console.info('Error in authenticating user!');
	          alert('Error in signing in user!');
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