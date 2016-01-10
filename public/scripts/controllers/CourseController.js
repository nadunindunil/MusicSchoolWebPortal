/**
 * Created by NADUN on 1/10/2016.
 */


angular.module('sbAdminApp')
    .controller('CoursesCtrl',['$scope','$http','$log', function($scope,$http,$log){


    $http.get('http://localhost:3000/getTimeSlotsTeachersCourseList')
        .success(function(data){
            $scope.Courses = data;
            console.log(data);
        })
        .error(function(err){
            $log.error(err);
        });




        $http.get('http://localhost:3000/getTeachersList')
            .success(function(data){
                $scope.Teachers = data;
                console.log(data);
            })
            .error(function(err){
                $log.error(err);
            });


        $http.get('http://localhost:3000/getTimeSlotList')
            .success(function(data){
                $scope.TimeSlots = data;
                console.log(data);
            })
            .error(function(err){
                $log.error(err);
            });
}]);