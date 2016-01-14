/**
 * Created by NADUN on 1/7/2016.
 */

angular.module('sbAdminApp')
    .controller('StudentsCtrl',['$scope','$http','$rootScope','$log', function($scope,$http,$log,$rootScope){

    $rootScope.pageName = "Students";
    $http.get('http://localhost:3000/getCoursesList')
        .success(function(data){
            $scope.Courses = data;
            console.log(data);
        })
        .error(function(err){
            $log.error(err);
        });

    $http.get('http://localhost:3000/getPerfGrpsList')
        .success(function(data){
            $scope.Groups = data;
            console.log(data);
        })
        .error(function(err){
            $log.error(err);
        });

    $http.get('http://localhost:3000/getStudentsList')
        .success(function(data){
            $scope.Students = data;
            console.log(data);
        })
        .error(function(err){
            $log.error(err);
        });




    $scope.findTelNums = function(ID){
        var NumList;
        $http.get('http://localhost:3000/findTelNum/'+ ID)
            .success(function(data){
                $scope.NumList = data;
                NumList = data;
                console.log('test1');
            })
            .error(function(err){
                $log.error(err);
            });
        return NumList;
    };

    $scope.nums = null;



    $scope.addStudent = function(){

        var id = $scope.sID;
        var gender = $scope.sgender;
        var name = $scope.fullname;
        var dob = $scope.dob;
        var acclevel = $scope.accLevel;
        var course = $scope.course;
        var pergroup = $scope.perGroup;
        var tel = $scope.telePhone;
        var add = $scope.address;

        console.log(id,gender,name,dob,pergroup,course );

        //$http.post('http://localhost:3000/insertTelNum',{
        //    ID: id,
        //    location: add,
        //    phone_number: tel
        //
        //});


        $http.post('http://localhost:3000/insertStudent',{
            ID: id,
            name: name,
            gender: gender,
            DOB: dob,
            access_level: acclevel,
            courseID: course,
            performance_group_ID:pergroup,
            phone_number_id:id,
            location: add,
            phone_number: tel

        });

        //STDreset();

    };

        $scope.addParent = function(){

            var id = $scope.sID;
            var gender = $scope.sgender;
            var name = $scope.fullname;
            var dob = $scope.dob;
            var acclevel = $scope.accLevel;
            var course = $scope.course;
            var pergroup = $scope.perGroup;
            var tel = $scope.telePhone;
            var add = $scope.address;
            var cid = $scope.cID;
            var parentNIC = $scope.pID;
            var parentName = $scope.pname;
            var parentGender = $scope.pgender;
            var parentTelephone = $scope.ptelephone;

            if (!$scope.cousin && $scope.cID != null){
                // cousin

                $http.post('http://localhost:3000/insertSibling',{
                    Stdt_ID:id,
                    sibling_ID:cid


                });


            }
            else if($scope.cousin){
                // parent
                $http.post('http://localhost:3000/insertParent',{
                    NID: parentNIC,
                    name: parentName,
                    child_ID: id,
                    pgender: parentGender,
                    phone_number_ID:parentTelephone


                });

            }

        }


}]);

