/**
 * Created by NADUN on 1/16/2016.
 */
//extracted from http://jasonwatmore.com/post/2014/05/26/AngularJS-Basic-HTTP-Authentication-Example.aspx


angular.module('sbAdminApp')

    .controller('loginCtrl',['$scope', '$rootScope', '$location', 'LoginService',
        function ($scope, $rootScope, $location, LoginService) {
            // reset login status
            LoginService.ClearCredentials();

            $scope.login = function () {
                $scope.dataLoading = true;
                LoginService.Login($scope.username, $scope.password, function(response) {
                    if(response.success) {
                        LoginService.SetCredentials($scope.username, $scope.password);
                        $location.path('/dashboard/home');
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            };

            $scope.logout = function(){
                LoginService.ClearCredentials();
            };
        }
        ]);