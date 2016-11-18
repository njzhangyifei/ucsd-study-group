angular.module('app.routes', ['ionicUIRouter'])

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('tabsController', {
                cache: false,
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
                    'tab-groups': {
                        templateUrl: 'templates/myGroups.html',
                        controller: 'myGroupsCtrl'
                    }
                },
            })
            .state('tabsController.profile', {
                url: '/page-profile',
                params:{
                    uid: null
                },
                views: {
                    'tab-profile': {
                        templateUrl: 'templates/profile.html',
                        controller: 'profileCtrl'
                    }
                }
            })

            .state('tabsController.addCourse', {
                cache: false,
                url: '/page-add-course',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/addCourse.html',
                        controller: 'addCourseCtrl'
                    }
                }
            })

            .state('tabsController.courseGroups', {
                cache: false,
                url: '/page-course-groups',
                params: {
                    course: null,
                    updateRequired: false
                },
                views: {
                    'tab-home': {
                        templateUrl: 'templates/courseGroups.html',
                        controller: 'courseGroupsCtrl'
                    }
                }
            })

            .state('tabsController.groupDetail', {
                cache: false,
                url: '/page-group-detail',
                params: {
                    group: null
                },
                views: {
                    'tab-groups': {
                        templateUrl: 'templates/groupDetail.html',
                        controller: 'groupDetailCtrl'
                    },
                    'tab-home': {
                        templateUrl: 'templates/groupDetail.html',
                        controller: 'groupDetailCtrl'
                    }
                }
            })

            .state('tabsController.newStudyGroup', {
                cache: false,
                url: '/page-new-study-group',
                params: {
                    course: null,
                },
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

    })


    .controller('tabsControllerCtrl', function($scope, $ionicTabsDelegate) {
        $scope.goHome = function() {
            $ionicTabsDelegate.$getByHandle('my-tabs').select(0);
        }  
    })

    .controller('tabHomeLocalCtrl', function($scope, $state) {
        console.log('tabHomeLocalCtrl');

        $scope.onTabSelected = function() {
            $state.go('tabsController.home', {updateRequired : true});
        }

    })
