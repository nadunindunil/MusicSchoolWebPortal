/**
 * Created by NADUN on 1/8/2016.
 */

angular.module('sbAdminApp')
    .controller('TeachersCtrl',['$scope','$rootScope','$http','$log', function($scope,$rootScope,$http,$log){


    $rootScope.pageName = "TEACHERS MANAGEMENT";
    $scope.teachInit = function(){

        $scope.query = '';

        $http.get('http://localhost:3000/getTeachersCourseList')
            .success(function(data){
                $scope.Teachers = data;
                console.log(data);
            })
            .error(function(err){
                $log.error(err);
            });

        $http.get('http://localhost:3000/getCoursesList')
            .success(function(data){
                $scope.Courses = data;
                console.log(data);
            })
            .error(function(err){
                $log.error(err);
            });

    };

    $scope.addTeacher = function(){

        var id = $scope.tID;
        var gender = $scope.tgender;
        var name = $scope.name;
        var dob = $scope.dob;
        var nic = $scope.nic;
        var acclevel = $scope.accLevel;
        var tel = $scope.telephone;
        var add = $scope.address;

        console.log(id,gender,name,dob,nic,acclevel,tel,add);

        $http.post('http://localhost:3000/insertTeacher',{
            ID: id,
            name: name,
            gender: gender,
            DOB: dob,
            nic:nic,
            access_level: acclevel,
            phone_number_id:id,
            location: add,
            phone_number: tel

        });


        $scope.teachInit();
    }
}]);