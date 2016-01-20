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
    'ngCookies',
    'oc.lazyLoad',
    'ui.router',
        'ngAnimate',
    'ui.bootstrap',
    'angular-loading-bar'
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        authenticate: true,
        controller: 'mainCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                        'scripts/controllers/main.js',
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
        authenticate: true,
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[

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

        .state('dashboard.teacherProfile',{
            templateUrl:'views/teacher/teacherProfile.html',
            authenticate: true,
            url:'/teacherProfile'
        })
        .state('dashboard.events',{
            templateUrl:'views/events/events.html',
            authenticate: true,
            url:'/events'
        })
          .state('dashboard.courses',{
            templateUrl:'views/courses.html',
            url:'/courses',
            authenticate: true,
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
        controller:'loginCtrl',
        authenticate: false,
        url:'/login',
        resolve: {
                loadMyFile:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:['scripts/controllers/loginController.js',
                            'scripts/services/services.js']
                    }),
                    $ocLazyLoad.load(
                        {
                            name:'ngCookies',
                            files:['public/libs/angular-cookies/angular-cookies.min.js']
                        })
                }
            }
    })
      .state('dashboard.students',{
        templateUrl:'views/students.html',
        url:'/students',
        authenticate: true,
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
    }).state('dashboard.studentProfile',{
            templateUrl:'views/students/studentProfile.html',
            authenticate: true,
            controller:'StudentProCtrl',
            url:'/students/:ID',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:[

                            'scripts/controllers/stdProfileController.js'

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
      .state('dashboard.instruments',{
          templateUrl:'views/instruments.html',
          url:'/instruments',
          controller:'InstrumentCtrl',
            authenticate: true,
            resolve: {
                loadMyFile:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:['scripts/controllers/instrumentController.js',
                            'scripts/directives/validate.js',
                            'js/form.js']
                    })
                }
            }
      })
      .state('dashboard.performanceGroups',{
        templateUrl:'views/perGroups.html',
        url:'/performanceGroups',
        controller:'PerGroupCtrl',
        authenticate: true,
        resolve: {
                loadMyFile:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:['scripts/controllers/perGroupController.js',
                            'scripts/directives/validate.js',
                            'js/form.js']
                    })
                }
            }
    })
      .state('dashboard.performanceItems',{
            templateUrl:'views/performanceItems.html',
            url:'/performanceItems',
            controller:'PerItemCtrl',
            authenticate: true,
            resolve: {
                loadMyFile:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:['scripts/controllers/perfItemController.js',
                            'scripts/directives/validate.js',
                            'js/form.js']
                    })
                }
            }
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


    .factory('LoginService',['Base64', '$http', '$rootScope', '$timeout',function(Base64, $http, $rootScope, $timeout){

        var service = {};
        //$rootScope.loggedin = false;

        if (localStorage.getItem("userData") === null) {
            console.log("inside the null userdata");

        }
        else{
            $rootScope.userInfo = JSON.parse(localStorage.userData);
        }

        //localStorage.loggedin = false;
        //var loggedIn = false;
        //localStorage.setItem("loggedIn", JSON.stringify(loggedIn));


        service.Login = function (username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            //$timeout(function(){
            //    var response = { success: username === 'test' && password === 'test' };
            //    if(!response.success) {
            //        response.message = 'Username or password is incorrect';
            //    }
            //    callback(response);
            //}, 1000);



            $http.post('http://localhost:3000/login',{ID:username , password:password })

                .success(function (response) {
                    console.log("success in" + response.name);
                    callback(response);
                }).error(function(response){
                    response.message = 'Username or password is incorrect';
                    console.log("error in checkuser");

            });



        };

        service.SetCredentials = function (id , username, acLevel , response) {
            var authdata = Base64.encode(username + ':' + acLevel +':'+ id);
            //$rootScope.loggedin = true;
            //localStorage.loggedin = true;
            var loggedIn = true;
            localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
            localStorage.setItem("userData", JSON.stringify(response));

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            //$cookieStore.put('globals', $rootScope.globals);
        };

        service.ClearCredentials = function () {
            //$rootScope.loggedin = false;

            var loggedIn = false;
            var res = {};
            localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
            localStorage.setItem("userData", JSON.stringify(res));
            console.log("inside the clear " + JSON.parse(localStorage.loggedIn));
            //localStorage.loggedin = false;
            $rootScope.globals = {};
            //$cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

        return service;

    }])

    .factory('AuthenticationService',
    [ '$http', '$rootScope', '$timeout',
        function ( $http, $rootScope, $timeout) {
            var service = {};


            if (localStorage.getItem("loggedIn") === null) {
                console.log("inside the null");
                var loggedIn = false;
                localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
            }

            service.isLoggedIn = function(){
                console.log("1 st in isloggedin "+localStorage.loggedIn);
                console.log("inside the isloggedin " + JSON.parse(localStorage.loggedIn));
                var login = JSON.parse(localStorage.loggedIn);
                if (login){
                    return true;
                }
                return false;
            };



            return service;
        }])

    .run(function($rootScope, $state, AuthenticationService){
       // $state.go('viewselection', {engineProgramId: id});
        $rootScope.$on("$stateChangeStart",

            function(event, toState, toParams, fromState, fromParams) {
                console.log(toState.authenticate + ','+AuthenticationService.isLoggedIn());

                if (toState.authenticate && !AuthenticationService.isLoggedIn()) {
                    console.log(AuthenticationService.isLoggedIn());
                    $state.go('login');
                    event.preventDefault();
                }
            });

    })

   ;

    
