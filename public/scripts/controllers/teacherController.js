/**
 * Created by NADUN on 1/8/2016.
 */

angular.module('sbAdminApp')
    .controller('TeachersCtrl',['$scope','$http','$log', function($scope,$http,$log){


    $http.get('http://localhost:3000/getTeachersList')
        .success(function(data){
            $scope.Teachers = data;
            console.log(data);
        })
        .error(function(err){
            $log.error(err);
        });

    $scope.addTeacher = function(){

        var id = $scope.tID;
        var gender = $scope.tgender;
        var name = $scope.name;
        var dob = $scope.dob;
        var nic = $scope.nic;
        var acclevel = $scope.accLevel;
        var tel = $scope.telephone;
        var add = $scope.address;

        console.log(id,gender,name,dob);

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

        //STDreset();

    }
}]);