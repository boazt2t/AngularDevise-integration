
Blog = angular.module('myModule', ['ngRoute', 'Devise']);

Blog.run(['$rootScope', function($rootScope){
    $rootScope.currentUser = null;
    $rootScope.notifyMsg = null;
    $rootScope.flash = "";
}]);

Blog.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/sign_up', {
          templateUrl: '../assets/sign_up.html',
          controller: 'signUpCtrl'
        })
        .when('/sign_in', {
          templateUrl: '../assets/sign_in.html',
          controller: 'signInCtrl'
        })
        .when('/portfolio', {
          templateUrl: '../assets/portfolio.html',
          controller: 'portfolioCtrl'
        })
        .when('/edit/password', {
          templateUrl: '../assets/change_password.html',
          controller: 'changePwdCtrl'
        })
        .when('/edit/account', {
          templateUrl: '../assets/change_account.html',
          controller: 'changeAccountCtrl'
        })
        .otherwise({
        	templateUrl: '../assets/welcome.html',
        	controller: 'welCtrl'
        })
    }
  ]);
  
Blog.factory("flash", ['$rootScope', '$routeParams', '$location', '$routeParams', 
  function($rootScope, $routeParams, $location, $routeParams) {

  var queue = [];
  var currentMessage = "";
  var beforePath = null;

  $rootScope.$on("$routeChangeSuccess", function(event) {
    
//    console.log("currentMessage: " + currentMessage);
  });

  $rootScope.$on("$locationChangeSuccess", function() {
    //debugger;
    //console.log("location:"  + beforePath);
    if (beforePath != $location.path()) {
      currentMessage = queue.shift() || ""; 

    }
    beforePath = $location.path();
    
    //console.log("location:"  + $location.path());
  });

  return {
    setMessage: function(message) {
      //debugger;
      queue.push(message);
    },
    getMessage: function() {
      return currentMessage;
    }
  };
}
]);

Blog.directive('showErrors', ['$timeout', 'showErrorsConfig', function ($timeout, showErrorsConfig) {
      var getShowSuccess, linkFn;
      
      getShowSuccess = function (options) {
        var showSuccess;
        showSuccess = showErrorsConfig.showSuccess;
        if (options && options.showSuccess != null) {
          showSuccess = options.showSuccess;
        }
        return showSuccess;
      };

      linkFn = function (scope, el, attrs, formCtrl) {
        var blurred, inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses;
        blurred = false;
        options = scope.$eval(attrs.showErrors);
        showSuccess = getShowSuccess(options);
        inputEl = el[0].querySelector('[name]');
        inputNgEl = angular.element(inputEl);
        inputName = inputNgEl.attr('name');

        if (!inputName) {
          throw 'show-errors element has no child input elements with a \'name\' attribute';
        }

        inputNgEl.bind('blur', function () {
          blurred = true;
          //console.log('blured')
          return toggleClasses(formCtrl[inputName].$invalid);
        });

        scope.$watch(function () {
          return formCtrl[inputName] && formCtrl[inputName].$invalid;
        }, function (invalid) {
          //console.log("watchesss");
          if (!blurred) {
            return;
          }
          
          return toggleClasses(invalid);
        });

        scope.$on('show-errors-check-validity', function () {
            if (!angular.isUndefined(scope.err)) {
                if (inputName == 'email' && !angular.isUndefined(scope.err.email)) return toggleClasses(true);
                if (inputName == 'password' && !angular.isUndefined(scope.err.password)) return toggleClasses(true);
                if (inputName == 'password_confirmation' && !angular.isUndefined(scope.err.password_confirmation)) return toggleClasses(true);
                if (inputName == 'current_password' && !angular.isUndefined(scope.err.current_password)) return toggleClasses(true);
                if (inputName == 'first_name' && !angular.isUndefined(scope.err.first_name)) return toggleClasses(true);
                if (inputName == 'last_name' && !angular.isUndefined(scope.err.last_name)) return toggleClasses(true);
                if (inputName == 'phone_number' && !angular.isUndefined(scope.err.phone_number)) return toggleClasses(true);
            }
                
            return toggleClasses(formCtrl[inputName].$invalid);
        });

        scope.$on('show-errors-reset', function () {
          return $timeout(function () {
            el.removeClass('has-error');
            el.removeClass('has-success');
            return blurred = false;
          }, 0, false);
        });

        return toggleClasses = function (invalid) {
          el.toggleClass('has-error', invalid);
          if (showSuccess) {
            return el.toggleClass('has-success', !invalid);
          }
        };
      };

      return {
        restrict: 'A',
        require: '^form',
        compile: function (elem, attrs) {
          if (!elem.hasClass('form-group')) {
            throw 'show-errors element does not have the \'form-group\' class';
          }
          return linkFn;
        }
      };
    }
  ]);
  
  Blog.provider('showErrorsConfig', function () {
    var _showSuccess;
    _showSuccess = false;
    this.showSuccess = function (showSuccess) {
      return _showSuccess = showSuccess;
    };
    this.$get = function () {
      return { showSuccess: _showSuccess };
    };
  });

