angular.module('app.routes', ['ionicUIRouter'])

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('tabsController', {
                url: '/page-tab-controller',
                templateUrl: 'templates/tabsController.html',
                abstract:true
            })

            .state('login', {
                url: '/page-login',
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            })

            .state('signup', {
                url: '/page-signup',
                templateUrl: 'templates/signup.html',
                controller: 'signupCtrl'
            })

            .state('tabsController.editProfile', {
                url: '/page-edit-profile',
                views: {
                    'tab-profile':{
                        templateUrl: 'templates/editProfile.html',
                        controller: 'editProfileCtrl'
                    }
                }
            })

            .state('tabsController.home', {
                cache: false,
                url: '/page-home',
                params: {
                    updateRequired: false
                },
                views: {
                    'tab-home': {
                        templateUrl: 'templates/home.html',
                        controller: 'homeCtrl'
                    }
                },
            })

            .state('tabsController.myGroups', {
                cache: false,
                url: '/page-myGroups',
                params: {
                    updateRequired: false
                },
                views: {
                    'tab-home': {
                        templateUrl: 'templates/myGroups.html',
                        controller: 'myGroupsCtrl'
                    }
                },
            })
            .state('tabsController.profile', {
                url: '/page-profile',
                views: {
                    'tab-profile': {
                        templateUrl: 'templates/profile.html',
                        controller: 'profileCtrl'
                    }
                }
            })

            .state('addCourse', {
                cache: false,
                url: '/page-add-course',
                templateUrl: 'templates/addCourse.html',
                controller: 'addCourseCtrl'
            })

            .state('tabsController.groupTabPage', {
                url: '/page-group-page',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/groupTabPage.html',
                        controller: 'groupTabPageCtrl'
                    }
                }
            })

            .state('tabsController.groupDetail', {
                url: '/page8',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/groupDetail.html',
                        controller: 'groupDetailCtrl'
                    }
                }
            })

            .state('tabsController.newStudyGroup', {
                url: '/page10',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/newStudyGroup.html',
                        controller: 'newStudyGroupCtrl'
                    }
                }
            })

        // default page
        // $urlRouterProvider.otherwise('/page1/page7')
        $urlRouterProvider.otherwise('/page-login')

    });
