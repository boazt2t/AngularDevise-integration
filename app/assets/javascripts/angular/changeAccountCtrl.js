Blog.controller('changeAccountCtrl', ['Auth', '$scope', '$location', '$rootScope', 'flash',
	function(Auth, $scope, $location, $rootScope, flash) {

        //console.log($rootScope.currentUser);
        $rootScope.flash = flash;


        if($rootScope.currentUser) {
            $scope.changeAccountData = angular.copy($rootScope.currentUser);
        } else {
            Auth.currentUser().then(function(user) {
                console.log(user); // => {id: 1, ect: '...'}
                $rootScope.currentUser = user;
                $scope.changeAccountData = angular.copy(user);
            }, function(error) {
                $rootScope.currentUser = null;
            });
        }
        
        //console.log("changeAccountData");
        //console.log($scope.changeAccountData);

        $scope.changeAccount = function() {

            $scope.$broadcast('show-errors-check-validity');
            if ($scope.changeAccountForm.$invalid)  return; 

            var config = {
                headers: {
                    'X-HTTP-Method-Override': 'PUT'
                }
            };

            
            Auth.update($scope.changeAccountData, config).then(function(updatedUser) {
                flash.setMessage("Successfully changed your account");
                $location.path("/portfolio");
            }, function(error) {
                console.log(error);
                $scope.err = error.data.errors;
                $scope.$broadcast('show-errors-check-validity');
            });
        }
    }
]);