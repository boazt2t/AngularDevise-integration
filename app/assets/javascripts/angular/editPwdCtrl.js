Blog.controller('editPwdCtrl', ['Auth', '$scope', '$location', '$rootScope', 'flash',
	function(Auth, $scope, $location, $rootScope, flash) {

        /*$rootScope.flash = flash;
        if($rootScope.currentUser) {
            $scope.changePwdData = angular.copy($rootScope.currentUser);
        } else {
            Auth.currentUser().then(function(user) {
                console.log(user); // => {id: 1, ect: '...'}
                $rootScope.currentUser = user;
                $scope.changePwdData = angular.copy(user);
            }, function(error) {
                $rootScope.currentUser = null;
            });
        }
        
        $scope.changePwd = function() {
            if ($scope.changePwdData.password != $scope.changePwdData.password_confirmation) {
                $scope.err = {
                    password_confirmation: ["doesn't match Password"]
                };
                
                $scope.changePwdForm.$invalid = true;
            } 

            //debugger;
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.changePwdForm.$invalid)  return; 

            var config = {
                headers: {
                    'X-HTTP-Method-Override': 'PUT'
                }
            };

            
            Auth.update($scope.changePwdData, config).then(function(updatedUser) {
                flash.setMessage("Successfully changed your password");
                $location.path("/portfolio");
            }, function(error) {
                console.log(error);
                $scope.err = error.data.errors;
                $scope.$broadcast('show-errors-check-validity');
                return ;
            });
        }

        Auth.currentUser().then(function(user) {
            $rootScope.currentUser = user;
        }, function(error) {
            // unauthenticated error
            $rootScope.currentUser = null;
        });*/
    }
]);