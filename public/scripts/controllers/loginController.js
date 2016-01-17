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
                    console.log("inside the login in ctrler" + response.name);
                    if(response.LogIn == 1) {
                        LoginService.SetCredentials(response.IDs , response.name, response.Admin , response);
                        $location.path('/dashboard/home');
                        console.log("inside the if");
                    } else {
                        $scope.error = 'Username or password is incorrect';
                        $scope.dataLoading = false;
                        console.log("inside the else");
                    }
                });
            };

            $scope.logout = function(){
                LoginService.ClearCredentials();
            };
        }
        ]);