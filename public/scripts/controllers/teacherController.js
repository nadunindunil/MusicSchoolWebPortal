/**
 * Created by NADUN on 1/8/2016.
 */

angular.module('sbAdminApp')
    .controller('TeachersCtrl',['$scope','$rootScope','$http','$log', function($scope,$rootScope,$http,$log){

        var inst = JSON.parse(localStorage.userData);
        $scope.userName = inst.name;

        if (inst.Admin == 'True'){
            console.log("inside true");
            $scope.secLevel = true;

        }
        else{$scope.secLevel = false;}

        var d = new Date();
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        $scope.thisMonth = month[d.getMonth()];  //this month

        $scope.thisYear = d.getFullYear(); // this year

        $scope.thisDate = d.getDate();  // current date

    $scope.setAttendance = function(){

        var teacherIden = $scope.thisTID;
        var year = $scope.thisYear;
        var month = $scope.thisMonth;
        var date = $scope.thisDate;

        $http.post('http://localhost:3000/insertAttendance',{
            teacID:teacherIden,
            year:year,
            month:month,
            date:date

        });

        $scope.teachInit();

    };
    $scope.settID = function(id){

        $scope.thisTID = id;
    };

    $scope.teachInit = function(){
        //$rootScope.pageName = "TEACHERS MANAGEMENT";
        $scope.query = '';

        $http.get('http://localhost:3000/getTeachersCourseAttList')
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