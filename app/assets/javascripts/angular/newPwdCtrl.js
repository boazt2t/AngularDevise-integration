Blog.controller('newPwdCtrl', ['Auth', '$scope', '$location', '$rootScope', 'flash',
	function(Auth, $scope, $location, $rootScope, flash) {

        $rootScope.flash = flash;
/*        if($rootScope.currentUser) {
            $scope.newPwdData = angular.copy($rootScope.currentUser);
        } else {
            Auth.currentUser().then(function(user) {
                console.log(user); // => {id: 1, ect: '...'}
                $rootScope.currentUser = user;
                $scope.changePwdData = angular.copy(user);
            }, function(error) {
                $rootScope.currentUser = null;
            });
        }*/
        
        $scope.newPwd = function() {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.newPwdForm.$invalid)  return; 

            var config = {
                headers: {
                    'X-HTTP-Method-Override': 'POST'
                }
            };

            
            Auth.newpassword($scope.newPwdData, config).then(function(User) {
                flash.setMessage("You will receive an email with instructions on how to reset your password in a few minutes.");
                $location.path("/sign_in");
            }, function(error) {
                console.log(error);
                $scope.err = error.data.errors;
                $scope.$broadcast('show-errors-check-validity');
                return ;
            });
        }

       /* Auth.currentUser().then(function(user) {
            $rootScope.currentUser = user;
        }, function(error) {
            // unauthenticated error
            $rootScope.currentUser = null;
        });*/
    }
]);