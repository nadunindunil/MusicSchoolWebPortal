/**
 * Created by NADUN on 1/9/2016.
 */

var INTEGER_REGEXP = /^\-?\d+$/;
angular.module('sbAdminApp')
    .directive('integer', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.integer = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }

                if (INTEGER_REGEXP.test(viewValue)) {
                    // it is valid
                    return true;
                }

                // it is invalid
                return false;
            };
        }
    };
});

//angular.module('sbAdminApp')
//    .directive('cusLength', function() {
//        return {
//            require: 'ngModel',
//            scope: {
//                cusLength: '='
//            },
//            link: function($scope, $element, $attrs, ngModel) {
//                $scope.$watch($attrs.ngModel, function(value) {
//                    var isValid = (value.length === $scope.cusLength);
//                    ngModel.$setValidity($attrs.ngModel, isValid);
//                });
//            }
//        };
//    });

