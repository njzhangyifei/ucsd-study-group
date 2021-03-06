// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app',
    ['ionic', 'ngCordova', 'app.controllers', 'app.homeController', 
     'app.newStudyGroupController',
     'app.addCourseController', 'app.profileController',
     'app.viewMemberProfileController',
     'app.courseGroupsController', 'app.myGroupsController',
     'app.groupDetailController',
     'app.groupDiscussionController',
     'app.routes', 'app.directives',
     'app.services', 'app.courseDatabaseService', 'app.newClassPopupService',
     'app.userDatabaseService', 'app.groupDatabaseService', 'app.meetingController',
     'jett.ionic.filter.bar',
     'monospaced.elastic', "ion-datetime-picker", 'ngCordova'
    ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    console.log("Up and running - ionic ver "+ ionic.version);
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https|ftp|mailto|file|tel|data)/);
})
