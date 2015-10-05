Blog.controller('portfolioCtrl', ['Auth', '$scope', '$location', '$rootScope',
	function(Auth, $scope, $location, $rootScope) {
        // Use your configured Auth service.
        
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