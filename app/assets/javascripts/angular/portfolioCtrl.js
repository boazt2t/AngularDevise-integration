Blog.controller('portfolioCtrl', ['Auth', '$scope', '$location', '$rootScope',
  function(Auth, $scope, $location, $rootScope) {
        // Use your configured Auth service.
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'DELETE'
            }
        };
        // Log in user...
        // ...
        $scope.signOut = function() {
          Auth.logout(config).then(function(oldUser) {
              // alert(oldUser.name + "you're signed out now.");
              $location.path("/");
              $rootScope.currentUser = null;
              $rootScope.notifyMsg = "Successfully signed out";
          }, function(error) {
              // An error occurred logging out.
              $console.log("logout error");
          });
        }
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