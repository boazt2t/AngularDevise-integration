angular.module('myModule', ['Devise']).
    config(function(AuthProvider) {
        // Configure Auth service with AuthProvider
    }).
    controller('welCtrl', function(Auth, $scope) {
        // Use your configured Auth service.
        $scope.owner = "Bill"
    });