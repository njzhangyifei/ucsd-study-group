angular.module('app.controllers',
    ['ionic', 'app.services', 'jett.ionic.filter.bar',
        'app.userDatabaseService',
        'app.courseDatabaseService'])

    .controller('groupTabPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

    .controller('loginCtrl',
        ['$scope', '$state', '$stateParams',
            '$ionicPopup', '$ionicLoading', '$ionicHistory', '$timeout',
            'loginService',
            // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
            // You can include any angular dependencies as parameters for this function
            // TIP: Access Route Parameters for your page via $stateParams.parameterName
            function ($scope, $state, $stateParams, $ionicPopup, $ionicLoading, $ionicHistory, $timeout, loginService) {
                $scope.loginForm = {};

                $ionicLoading.show({
                    template: 'Loading',
                    delay: 50,
                });

                loginService.onSignout(function(){
                    $state.go('login');
                })

                loginService.onLoginStatusChanged(function(user){
                    var emailVerification = function(user){
                        var verificationPopup = $ionicPopup.confirm({
                            title: 'Verification your Email',
                            template: 'Please check your inbox',
                            cancelText: 'Resend Email',
                            okText: 'Okay'
                        });

                        verificationPopup.then(function(res) {
                            if(!res) {
                                user.sendEmailVerification();
                            } else {
                                loginService.signout();
                            }
                        });
                    }
                    if (user) {
                        if (user.emailVerified) {
                            $ionicHistory.nextViewOptions({
                                disableBack: true
                            });
                            $state.go('tabsController.myGroups', {updateRequired : true});
                        } else {
                            emailVerification(user);
                        }
                    }
                    $ionicLoading.hide();
                })

                $scope.login = function(){
                    var email = $scope.loginForm.id;
                    var password = $scope.loginForm.password;

                    if (email && password) {

                        $ionicLoading.show({
                            template: 'Loading',
                            delay: 50
                        });
                        loginService
                            .login(email, password)
                            .then(function(){
                                // $ionicLoading.hide();
                            })
                            .catch(function(error){
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: 'Login Failed',
                                    template: 'Wrong username or password'
                                })
                                console.log('error: ' + error);
                            });
                    } else {
                        $ionicPopup.alert({
                            title: 'Invalid Input',
                            template: 'Please enter username and password'
                        })
                    }
                };

                $scope.signup = function(){
                    console.log("button sign up clicked");
                    $state.go('signup');
                };

              $scope.customInputOnBlur = function() {
                    if ($scope.loginForm.id){
                        angular.element(document.querySelector( '#login-email' )).addClass("used");
                    } else {
                        angular.element(document.querySelector( '#login-email' )).removeClass("used");
                    }
                    if ($scope.loginForm.password){
                        angular.element(document.querySelector( '#login-password' )).addClass("used");
                    } else {
                        angular.element(document.querySelector( '#login-password' )).removeClass("used");
                    }
                };
                angular.element(document).ready(function(){
                    $scope.customInputOnBlur();
                });
            }])

    .controller('signupCtrl',
        ['$scope', '$stateParams',
            '$ionicLoading', '$ionicPopup',
            'loginService', 'profileService',
            // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
            // You can include any angular dependencies as parameters for this function
            // TIP: Access Route Parameters for your page via $stateParams.parameterName
            function ($scope, $stateParams, $ionicLoading, $ionicPopup, loginService, profileService) {
                $scope.signupForm = {}

                $scope.signup = function(){
                    var verifyInput = function () {
                        var correctEmail = false;
                        var hasEmail = false;
                        if ($scope.signupForm.email) {
                            hasEmail = true;
                            correctEmail = $scope.signupForm.email.trim().endsWith('@ucsd.edu');
                            if (!correctEmail) {
                                return "Please use UCSD email address"
                            }
                        } else {
                            return "Please enter UCSD email address"
                        }

                        var correctPassword = false;
                        var hasPassword = false;
                        var samePassword = false;
                        var lengthPassword = false;
                        if ($scope.signupForm.password) {
                            hasPassword = true;
                            if ($scope.signupForm.password == $scope.signupForm.passwordVerify){
                                samePassword = true;
                                if ($scope.signupForm.password.length >= 8) {
                                    lengthPassword = true;
                                    correctPassword = true;
                                } else {
                                    return "Password has to be at least 8 characters"
                                }
                            } else {
                                return "Password entered are not the same"
                            }
                        } else {
                            return "Please enter password"
                        }

                        var correctNickName = false;
                        if ($scope.signupForm.nickname) {
                            correctNickName = true;
                        } else {
                            return "Please enter nickname"
                        }
                        return null
                    }

                    var error = verifyInput(
                        $scope.signupForm.email, $scope.signupForm.password
                    );
                    if (error) {
                        $ionicPopup.alert({
                            title: 'Invalid Input',
                            template: error
                        });
                    } else {
                        $ionicLoading.show({
                            template: 'Loading',
                            delay: 50
                        });
                        loginService
                            .signup(
                                $scope.signupForm.email, $scope.signupForm.password
                            )
                            .then(function(user){
                                //create database entry for user's profile
                                user.updateProfile({displayName: $scope.signupForm.nickname})
                                    .then(function(){
                                        profileService.createProfile(user);
                                    }, function(error){
                                        // an error happened
                                    });

                                //send verification email
                                loginService.sendVerification();
                                $ionicLoading.hide();

                                console.log("registered");

                            }, function(error){
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: 'Invalid Input',
                                    template: error
                                });
                            });
                    }
                }
            }])

    .controller('addCourseCtrl', [
        '$scope', '$stateParams', '$state', '$ionicFilterBar', '$ionicLoading',
        '$ionicHistory', 'newClassPopupService', 'courseDatabaseService', 'userCourseGroupService',
        function ($scope, $stateParams, $state,
            $ionicFilterBar, $ionicLoading, $ionicHistory,
            newClassPopupService, courseDatabaseService, userCourseGroupService) {
                var filterBarInstance;

                function getItems () {
                    $scope.items = [];
                    $ionicLoading.show({
                        template: 'Loading',
                        delay: 50
                    });
                    return courseDatabaseService
                        .getAvailableCourses()
                        .then(function(snapshot){
                            snapshot.forEach(function(childSnapshot){
                                var childKey = childSnapshot.key;
                                var childData = childSnapshot.val();
                                $scope.items.push(
                                    {name: childKey, courseId: childData}
                                );
                            })
                            $ionicLoading.hide();
                        }).catch(function(error){
                            $ionicLoading.hide();
                        });
                }

                getItems();

                $scope.goback = function(){
                    $ionicHistory.goBack();
                }

                $scope.showFilterBar = function () {
                    filterBarInstance = $ionicFilterBar.show({
                        items: $scope.items,
                        update: function (filteredItems, filterText) {
                            $scope.items = filteredItems;
                        }
                    });
                };

                $scope.refreshItems = function () {
                    if (filterBarInstance) {
                        filterBarInstance();
                        filterBarInstance = null;
                    }

                    // load items here
                    getItems().then(function(){
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                };

                $scope.selectedItem = function(item) {
                    console.log("adding course")
                    userCourseGroupService.addUserCourse(item.courseId);
                    $state.go('tabsController.home',
                        {updateRequired:true}
                    );
                };

                $scope.addNewCourse = function() {
                    newClassPopupService.show().then(function(res){
                        if (res) {
                            // course added
                            $ionicLoading.show({
                                template: 'Loading',
                                delay: 50
                            });
                            courseDatabaseService.createCourse(res)
                                .then(
                                    function() {
                                        getItems();
                                        $ionicLoading.hide();
                                    }
                                )
                                .catch(
                                    function() {
                                        console.log("Error writing to database");
                                        getItems();
                                        $ionicLoading.hide();
                                    }
                                )
                        }
                    });
                }
            }])

;
