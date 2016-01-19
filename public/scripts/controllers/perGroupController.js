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
                    $scope.perGroupsList = data;
                    console.log(data);
                })
                .error(function(err){
                    $log.error(err);
                });

            $http.get('http://localhost:3000/getPerfItems')
                .success(function(data){
                    $scope.ItemsList = data;
                    console.log(data);
                })
                .error(function(err){
                    $log.error(err);
                });

            $http.get('http://localhost:3000/getTimeSlotList')
                .success(function(data){
                    $scope.Sessions = data;
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

            $http.post('http://localhost:3000/insertPerfGroup',{
                group_ID: id,
                performance_item_ID: item,
                practice_session_ID:session

            });

            $scope.pgInit();



        };

        

    }]);




