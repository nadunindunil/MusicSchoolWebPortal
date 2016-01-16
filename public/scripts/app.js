'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar'
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true
    });

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                        'scripts/directives/sidebar/sidebar.js',
                        //'scripts/directives/sidebar/sidebar-search/sidebar-search.js',
                        'scripts/directives/header/header.js'
                    //'scripts/directives/header/header-notification/header-notification.js',


                    ]
                })
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                })
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/main.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/chat/chat.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
        .state('dashboard.studentProfile',{
            templateUrl:'views/students/studentProfile.html',
            url:'/studentProfile'
        })
        .state('dashboard.teacherProfile',{
            templateUrl:'views/teacher/teacherProfile.html',
            url:'/teacherProfile'
        })
        .state('dashboard.events',{
            templateUrl:'views/events/events.html',
            url:'/events'
        })
          .state('dashboard.courses',{
            templateUrl:'views/courses.html',
            url:'/courses',
            controller:'CoursesCtrl',
            resolve: {
                loadMyFile:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:['scripts/controllers/courseController.js',
                               'scripts/directives/validate.js',
                               'js/form.js']
                    })
                }
            }
    })
      .state('login',{
        templateUrl:'views/pages/login.html',
        url:'/login'
    })
      .state('dashboard.students',{
        templateUrl:'views/students.html',
        url:'/students',
        controller:'StudentsCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[
                    'scripts/controllers/studentController.js',
                    'scripts/directives/validate.js',
                    'js/form.js'

                ]
            })
          }
        }
    })
      .state('dashboard.teachers',{

            templateUrl:'views/teachers.html',
            controller: 'TeachersCtrl',
            url:'/teachers',
            authenticate: true,
            resolve: {
                loadMyFile:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                            name:'sbAdminApp',
                            files:['scripts/controllers/teacherController.js',
                                   'scripts/directives/validate.js',
                                   'js/form.js']
                        })
                }
            }
    })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid'
   })
  }])
    .factory('AuthenticationService',
    [ '$http', '$rootScope', '$timeout',
        function ( $http, $rootScope, $timeout) {
            var service = {};

            //service.Login = function (username, password, callback) {
            //
            //    /* Dummy authentication for testing, uses $timeout to simulate api call
            //     ----------------------------------------------*/
            //    $timeout(function(){
            //        var response = { success: username === 'test' && password === 'test' };
            //        if(!response.success) {
            //            response.message = 'Username or password is incorrect';
            //        }
            //        callback(response);
            //    }, 1000);
            //
            //
            //    /* Use this for real authentication
            //     ----------------------------------------------*/
            //    //$http.post('/api/authenticate', { username: username, password: password })
            //    //    .success(function (response) {
            //    //        callback(response);
            //    //    });
            //
            //};

            service.isLoggedIn = function(){

                return true;
            };

            //service.SetCredentials = function (username, password) {
            //    var authdata = Base64.encode(username + ':' + password);
            //
            //    $rootScope.globals = {
            //        currentUser: {
            //            username: username,
            //            authdata: authdata
            //        }
            //    };
            //
            //    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            //    $cookieStore.put('globals', $rootScope.globals);
            //};
            //
            //service.ClearCredentials = function () {
            //    $rootScope.globals = {};
            //    $cookieStore.remove('globals');
            //    $http.defaults.headers.common.Authorization = 'Basic ';
            //};

            return service;
        }])

    .run(function($rootScope, $state, AuthenticationService){

        $rootScope.$on("$stateChangeStart",
            function(event, toState, toParams, fromState, fromParams) {
                if (toState.authenticate && !AuthenticationService.isLoggedIn()) {
                    $state.go("login");
                    event.preventDefault();
                }
            });
    })

   ;

    
