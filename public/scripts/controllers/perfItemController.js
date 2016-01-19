/**
 * Created by NADUN on 1/20/2016.
 */




angular.module('sbAdminApp')
    .controller('PerItemCtrl',['$scope','$rootScope','$http','$log', function($scope,$rootScope,$http,$log){



        $scope.piInit = function(){
            //$rootScope.pageName = "COURSES";
            $scope.query = '';



            $http.get('http://localhost:3000/getPerfItems')
                .success(function(data){
                    $scope.perItemsList = data;
                    console.log(data);
                })
                .error(function(err){
                    $log.error(err);
                });




        };


        $scope.addperItem = function(){

            var id = $scope.periID;
            var itemName = $scope.itemname;
            var description = $scope.itemdesc;


            console.log(id,name);

            $http.post('http://localhost:3000/insertPerfItem',{
                item_ID: id,
                item_name: itemName,
                description:description

            });

            $scope.piInit();



        };






    }]);





