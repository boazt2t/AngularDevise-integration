Blog.controller('changePwdCtrl', ['Auth', '$scope', '$location', '$rootScope',
	function(Auth, $scope, $location, $rootScope) {
        // Use your configured Auth service.

        $scope.changePwdData = angular.copy($rootScope.currentUser);
        /*$scope.changePwdData.password = '';
        $scope.changePwdData.password_confirmation = '';
        $scope.changePwdData.current_password = '';
*/
        console.log($scope.changePwdData);

        var config = {
            headers: {
                'X-HTTP-Method-Override': 'PUT'
            }
        };

        $scope.changePwd = function() {
            if ($scope.changePwdData.password != $scope.changePwdData.password_confirmation) {
                $scope.err = {
                    password_confirmation: ["doesn't match Password"]
                };
                
                $scope.changePwdForm.$invalid = true;
            }

            $scope.$broadcast('show-errors-check-validity');
            if ($scope.changePwdForm.$invalid)  return; 

            var config = {
                headers: {
                    'X-HTTP-Method-Override': 'PUT'
                }
            };
            console.log("-------start update-----");
            Auth.update($scope.changePwdData, config).then(function(updatedUser) {
                //console.log(updatedUser); // => {id: 1, ect: '...'}
                //$rootScope.currentUser = updatedUser;
                
                $location.path("/portfolio");
                
                //$rootScope.notifyMsg = "changed your password successfully";
            }, function(error) {
                // Registration failed...
                console.log(error);
                $scope.err = error.data.errors;
                $scope.$broadcast('show-errors-check-validity');
                
            });

            /*Auth.currentUser().then(function(user) {
                // User was logged in, or Devise returned
                // previously authenticated session.
                console.log(user); // => {id: 1, ect: '...'}
            }, function(error) {
                // unauthenticated error
            });*/
        }
    }
]);