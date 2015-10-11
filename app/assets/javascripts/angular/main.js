
Blog = angular.module('myModule', ['ngRoute', 'Devise']);

Blog.run(['$rootScope', function($rootScope){
    $rootScope.currentUser = null;
    $rootScope.notifyMsg = null;
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
        .otherwise({
        	templateUrl: '../assets/welcome.html',
        	controller: 'welCtrl'
        })
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
          return toggleClasses(formCtrl[inputName].$invalid);
        });

        scope.$watch(function () {
          return formCtrl[inputName] && formCtrl[inputName].$invalid;
        }, function (invalid) {
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

