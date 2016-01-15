/**
 * Created by NADUN on 1/10/2016.
 */


angular.module('sbAdminApp')
    .controller('CoursesCtrl',['$scope','$http','$log', function($scope,$http,$log){


    $scope.cInit = function(){

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

    };


        $scope.addCourse = function(){

            var id = $scope.sID;
            var title = $scope.fullname;
            var teacher = $scope.teacherID;
            var tslot = $scope.tsID;


            console.log(id,title,teacher,tslot);

            $http.post('http://localhost:3000/insertCourse',{
                course_ID: id,
                title: title,
                time_slot_ID: tslot,
                teacher_ID: teacher


            });

            $scope.cInit();



        }
}]);