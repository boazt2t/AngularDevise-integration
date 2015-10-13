Blog.controller('signOutCtrl', ['Auth', '$scope', '$location', '$rootScope'
	function(Auth, $scope, $location, $rootScope) {
        // Use your configured Auth service.
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'DELETE'
            }
        };
        // Log in user...
        // ...
        Auth.logout(config).then(function(oldUser) {
            // alert(oldUser.name + "you're signed out now.");
            $location.path("/");
            $rootScope.currentUser = null;
            $rootScope.notifyMsg = "Successfully signed out";
        }, function(error) {
            // An error occurred logging out.
        });
	}
]);