Blog.controller('signUpCtrl', ['Auth', '$scope', '$location', '$rootScope',
	function(Auth, $scope, $location, $rootScope) {
		  
		/*$scope.reset = function() {
			$scope.$broadcast('show-errors-reset');
			$scope.registerData = { 
				email: '',
			    password: '',
			    password_confirmation: ''
			};
		}*/

		$scope.registerData = {
		    email: '',
		    password: '',
		    password_confirmation: ''
		};
		

		$scope.signUp = function() {
			if ($scope.registerData.password != $scope.registerData.password_confirmation) {
				$scope.err = {
					password_confirmation: ["doesn't match Password"]
				};
				
				$scope.registerForm.$invalid = true;
			}

			$scope.$broadcast('show-errors-check-validity');
			if ($scope.registerForm.$invalid)  return; 

			var config = {
			    headers: {
			        'X-HTTP-Method-Override': 'POST'
			    }
			};
      
			Auth.register($scope.registerData, config).then(function(registeredUser) {
			    console.log(registeredUser); // => {id: 1, ect: '...'}
			    $rootScope.currentUser = registeredUser;
			    $location.path("/sign_in");
			}, function(error) {
			    console.log(error);
			    $scope.err = error.data.errors;
			    $scope.$broadcast('show-errors-check-validity');
			});

			//$scope.reset();
			
		}

		$scope.$on('devise:new-registration', function(event, user) {
		    // ...
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
