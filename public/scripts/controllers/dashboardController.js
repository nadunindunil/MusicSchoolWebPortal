/**
 * Created by NADUN on 1/21/2016.
 */

angular.module('sbAdminApp')
    .controller('dashCtrl',['$scope','$rootScope','$http','$log', function($scope,$rootScope,$http,$log){

        var inst = JSON.parse(localStorage.userData);
        $scope.userName = inst.name;

        if (inst.Admin == 'True'){
            console.log("inside true");
            $scope.secLevel = true;

        }
        else{$scope.secLevel = false;}



        var init = function(){
            //$rootScope.pageName = "COURSES";
            $scope.query = '';

            $http.get('http://localhost:3000/getInstrumentsList')
                .success(function(data){
                    $scope.Instruments2 = data;
                    console.log(data);
                })
                .error(function(err){
                    $log.error(err);
                });


            $http.get('http://localhost:3000/getStudentsList')
                .success(function(data){
                    $scope.Students2 = data;
                    console.log(data);
                })
                .error(function(err){
                    $log.error(err);
                });

            $http.get('http://localhost:3000/getTeachersList')
                .success(function(data){
                    $scope.Teachers2 = data;
                    console.log(data);
                })
                .error(function(err){
                    $log.error(err);
                });

            $http.get('http://localhost:3000/getCoursesList')
                .success(function(data){
                    $scope.Courses2 = data;
                    console.log(data);
                })
                .error(function(err){
                    $log.error(err);
                });
        };


        init();


    }]);




