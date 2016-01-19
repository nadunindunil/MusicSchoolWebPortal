/**
 * Created by NADUN on 1/19/2016.
 */


angular.module('sbAdminApp')
    .controller('InstrumentCtrl',['$scope','$rootScope','$http','$log', function($scope,$rootScope,$http,$log){



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



        }
    }]);




