/**
 * Created by NADUN on 1/21/2016.
 */


angular.module('sbAdminApp')
    .controller('StudentProCtrl',['$scope','$state','$rootScope','$stateParams','$http','$log', function($scope,$stateParams,$rootScope,$http,$state,$log){

        $scope.id = $stateParams.ID;

        console($stateParams.ID);

        //$scope.stInit = function(){
        //    //$rootScope.pageName = "COURSES";
        //    //$scope.query = '';
        //    //$http.get('http://localhost:3000/getStudentDetails/'+ $state.params.ID ).success(function(data) {
        //    //    $scope.Studentdetails = data;
        //    //    console.log(data);
        //    //});
        //
        //
        //};








    }]);


