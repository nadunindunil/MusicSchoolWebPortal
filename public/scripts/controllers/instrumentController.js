/**
 * Created by NADUN on 1/19/2016.
 */


angular.module('sbAdminApp')
    .controller('InstrumentCtrl',['$scope','$rootScope','$http','$log', function($scope,$rootScope,$http,$log){

        var inst = JSON.parse(localStorage.userData);
        $scope.userName = inst.name;

        if (inst.Admin == 'True'){
            console.log("inside true");
            $scope.secLevel = true;

        }
        else{$scope.secLevel = false;}

        $scope.instInit = function(){
            //$rootScope.pageName = "COURSES";
            $scope.query = '';

            $http.get('http://localhost:3000/getInstrumentsList')
                .success(function(data){
                    $scope.Instruments = data;
                    console.log(data);
                })
                .error(function(err){
                    $log.error(err);
                });



        };


        $scope.addInstrument = function(){

            var id = $scope.insID;
            var name = $scope.insname;



            console.log(id,name);

            $http.post('http://localhost:3000/insertInstrument',{
                instrument_ID: id,
                name: name



            });

            $scope.instInit();



        };

        $scope.setIdentity =function(val){

            $scope.Identity= val;

        };

        $scope.allocateStudent = function(stdntID,instID){

            var Std = stdntID;
            var instr_ID = instID;
            console.log(instID);
            console.log(Std,instr_ID);

            $http.post('http://localhost:3000/addStudentForInstrument',{
                Std_ID: Std,
                instr_ID: instr_ID

            });

            $scope.instInit();

        }
    }]);




