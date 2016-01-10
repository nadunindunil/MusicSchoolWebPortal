/**
 * Created by NADUN on 1/10/2016.
 */


angular.module('sbAdminApp')
    .controller('CoursesCtrl',['$scope','$http','$log', function($scope,$http,$log){


    $http.get('http://localhost:3000/getCoursesList')
        .success(function(data){
            $scope.Courses = data;
            console.log(data);
        })
        .error(function(err){
            $log.error(err);
        })

}]);