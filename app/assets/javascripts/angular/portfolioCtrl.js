Blog.controller('portfolioCtrl', ['Auth', '$scope', '$location', '$rootScope', 'flash',
  function(Auth, $scope, $location, $rootScope, flash) {
        
        $rootScope.flash = flash;

        var config = {
            headers: {
                'X-HTTP-Method-Override': 'DELETE'
            }
        };
        
        $scope.signOut = function() {
          Auth.logout(config).then(function(oldUser) {
              $rootScope.currentUser = null;
              flash.setMessage("Successfully signed out");
              $location.path("/");
          }, function(error) {
              $console.log("logout error");
          });
        }

        Auth.currentUser().then(function(user) {
            
            $rootScope.currentUser = user;
        }, function(error) {
            // unauthenticated error
            $rootScope.currentUser = null;
        });
  }
]);
