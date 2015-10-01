
Blog = angular.module('myModule', ['ngRoute', 'Devise']);


Blog.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/sign_in', {
          templateUrl: '../assets/sign_in.html',
          controller: 'signInCtrl'
        })
        .otherwise({
        	templateUrl: '../assets/welcome.html',
        	controller: 'welCtrl'
        })
    }
  ]);
  
Blog.config(function(AuthProvider) {
        // Configure Auth service with AuthProvider
    });

Blog.controller('welCtrl', function(Auth, $scope) {
        // Use your configured Auth service.
        
    });

