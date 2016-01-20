/**
 * Created by NADUN on 1/10/2016.
 */


angular.module('sbAdminApp')
    .controller('CoursesCtrl',['$scope','$rootScope','$http','$log', function($scope,$rootScope,$http,$log){

        var inst = JSON.parse(localStorage.userData);
        $scope.userName = inst.name;

        if (inst.Admin == 'True'){
            console.log("inside true");
            $scope.secLevel = true;

        }
        else{$scope.secLevel = false;}

    $scope.cInit = function(){
        //$rootScope.pageName = "COURSES";
        $scope.query = '';

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
                teacherID: teacher


            });

            $scope.cInit();



        }
}]);