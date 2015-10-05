
Blog = angular.module('myModule', ['ngRoute', 'Devise']);

Blog.run(function($rootScope){
    $rootScope.currentUser = null;
    $rootScope.notifyMsg = null;
});

Blog.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/sign_in', {
          templateUrl: '../assets/sign_in.html',
          controller: 'signInCtrl'
        })
        .when('/sign_out', {
          templateUrl: '../assets/welcome.html',
          controller: 'signOutCtrl'
        })
        .when('/portfolio', {
          templateUrl: '../assets/portfolio.html',
          controller: 'portfolioCtrl'
        })
        .otherwise({
        	templateUrl: '../assets/welcome.html',
        	controller: 'welCtrl'
        })
    }
  ]);
  
/*
Blog.controller('mainCtrl', ['Auth', '$scope', '$location', '$rootScope',
	function(Auth, $scope, $location, $rootScope) {
		$scope.currentUser = null;

        $scope.loginData = {
            email: '',
            password: ''
        };

        $scope.signIn = function() {
        	var config = {
	            headers: {
	                'X-HTTP-Method-Override': 'POST'
	            }
	        };
	        Auth.login($scope.loginData, config).then(function(user) {
	            console.log(user); // => {id: 1, ect: '...'}
	            alert("Successfully signed in user");
	            $scope.currentUser = user;
	            $rootScope.isOk = true;
	            $location.path("/portfolio");
                console.log(isOk)
	        }, function(error) {
	            // Authentication failed...
	          console.info('Error in authenticating user!');
	          alert('Error in signing in user!');
	        });
        }


        $scope.$on('devise:login', function(event, currentUser) {
            // after a login, a hard refresh, a new tab
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            // user logged in by Auth.login({...})
        });

        Auth.currentUser().then(function(user) {
            // User was logged in, or Devise returned
            // previously authenticated session.
            console.log("this is currentUser");
            console.log(user); // => {id: 1, ect: '...'}
            console.currentUser = user;
            $rootScope.isOk = true;

        }, function(error) {
            // unauthenticated error
        });
        console.log($rootScope.isOk);
	}
]);
*/