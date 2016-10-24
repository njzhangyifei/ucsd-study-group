angular.module('app.routes', ['ionicUIRouter'])

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('tabsController.groupTabPage', {
                url: '/page4',
                views: {
                    'tab2': {
                        templateUrl: 'templates/groupTabPage.html',
                        controller: 'groupTabPageCtrl'
                    }
                }
            })

            .state('tabsController', {
                url: '/page1',
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
                    'tab3':{
                        templateUrl: 'templates/editProfile.html',
                        controller: 'editProfileCtrl'
                    }
                }
            })


            .state('tabsController.home', {
                url: '/page-home',
                views: {
                    'tab2': {
                        templateUrl: 'templates/home.html',
                        controller: 'homeCtrl'
                    }
                }
            })

            .state('tabsController.groupDetail', {
                url: '/page8',
                views: {
                    'tab2': {
                        templateUrl: 'templates/groupDetail.html',
                        controller: 'groupDetailCtrl'
                    }
                }
            })

        /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.profile'
      2) Using $state.go programatically:
        $state.go('tabsController.profile');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
    /page1/tab2/page9
    /page1/tab3/page9
    */
            .state('tabsController.profile', {
                url: '/page9',
                views: {
                    'tab2': {
                        templateUrl: 'templates/profile.html',
                        controller: 'profileCtrl'
                    },
                    'tab3': {
                        templateUrl: 'templates/profile.html',
                        controller: 'profileCtrl'
                    }
                }
            })

            .state('tabsController.newStudyGroup', {
                url: '/page10',
                views: {
                    'tab2': {
                        templateUrl: 'templates/newStudyGroup.html',
                        controller: 'newStudyGroupCtrl'
                    }
                }
            })

        // default page
        // $urlRouterProvider.otherwise('/page1/page7') 
        $urlRouterProvider.otherwise('/page-login')

    });
