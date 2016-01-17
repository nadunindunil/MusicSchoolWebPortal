'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('mainCtrl',['$scope','$rootScope','$position','LoginService', function($scope,$rootScope,$position,LoginService) {


      $scope.logout = function(){
        console.log("inside main logout");
        LoginService.ClearCredentials();


      };
      ////////////////////////// find out whether admin or not//////////////////////////////////////
      var inst = JSON.parse(localStorage.userData);
      $scope.userName = inst.name;

      if (inst.Admin == 'True'){
          console.log("inside true");
          $scope.secLevel = true;

      }
      else{$scope.secLevel = false;}

  }]);
