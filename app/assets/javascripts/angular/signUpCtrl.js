/*Blog.directive('showErrors', function ($timeout, showErrorsConfig) {
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
  );*/
  
 /* Blog.provider('showErrorsConfig', function () {
    var _showSuccess;
    _showSuccess = false;
    this.showSuccess = function (showSuccess) {
      return _showSuccess = showSuccess;
    };
    this.$get = function () {
      return { showSuccess: _showSuccess };
    };
  });*/


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
			    //$rootScope.notifyMsg = "you have to confirm your account by email";
			}, function(error) {
			    // Registration failed...
			    console.log(error);
			    $scope.err = error.data.errors;
			    $scope.$broadcast('show-errors-check-validity');
			});

			//$scope.reset();
			
		}

		$scope.$on('devise:new-registration', function(event, user) {
		    // ...
		});
	}
	]);
