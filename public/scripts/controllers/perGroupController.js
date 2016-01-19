/**
 * Created by NADUN on 1/19/2016.
 */


angular.module('sbAdminApp')
    .controller('PerGroupCtrl',['$scope','$rootScope','$http','$log', function($scope,$rootScope,$http,$log){



        $scope.pgInit = function(){
            //$rootScope.pageName = "COURSES";
            $scope.query = '';

            $http.get('http://localhost:3000/getPerGroupsList')
                .success(function(data){
                    $scope.perGroups = data;
                    console.log(data);
                })
                .error(function(err){
                    $log.error(err);
                });



        };


        $scope.addperGroup = function(){

            var id = $scope.perID;
            var item = $scope.Pitem;
            var session = $scope.pSession;


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



