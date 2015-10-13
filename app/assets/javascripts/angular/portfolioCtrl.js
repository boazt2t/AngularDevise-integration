Blog.controller('portfolioCtrl', ['Auth', '$scope', '$location', '$rootScope',
	function(Auth, $scope, $location, $rootScope) {
        // Use your configured Auth service.
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };

        $scope.signOut = function() {
            Auth.logout(config).then(function(oldUser) {
                // alert(oldUser.name + "you're signed out now.");
                $rootScope.notifyMsg = "Successfully logged out";
                $location.path("/");
            }, function(error) {
                // An error occurred logging out.
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