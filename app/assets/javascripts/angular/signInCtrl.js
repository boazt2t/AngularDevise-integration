Blog.controller('signInCtrl', ['Auth', '$scope', '$location', '$rootScope',
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
          
          $scope.$broadcast('show-errors-check-validity');
          if ($scope.loginForm.$invalid)  return; 

	        Auth.login($scope.loginData, config).then(function(user) {
	            //console.log(user); // => {id: 1, ect: '...'}
	            $location.path("/portfolio");
              $rootScope.currentUser = user;
              console.log($rootScope.currentUser);
              $rootScope.notifyMsg = "Successfully signed in user";
	            //alert("Successfully signed in user");
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
	}
]);

/*angular.module('myModule', ['Devise']).
    controller('myCtrl', function(Auth) {
        
    });*/
/*

angular.module('public.ctrl.signIn', [])
  .controller('signInCtrl', ['Auth', '$scope', '$location',
    function(Auth, $scope, $location) {
      this.credentials = { email: '', password: '' };

      this.signIn = function() {
        // Code to use 'angular-devise' component
        Auth.login(this.credentials).then(function(user) {
          $location.path("/");
          alert('Successfully signed in user!')
        }, function(error) {
          console.info('Error in authenticating user!');
          alert('Error in signing in user!');
        });
      }
    }

  ]);*/