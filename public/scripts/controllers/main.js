'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('mainCtrl',['$scope','$position','LoginService', function($scope,$position,LoginService) {


      $scope.logout = function(){
        console.log("inside main logout");
        LoginService.ClearCredentials();


      };
      var inst = localStorage.userData;
      console.log(localStorage.userData);
      console.log(inst.name);
      $scope.userName = localStorage.userData.name;

  }]);
