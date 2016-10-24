angular.module('app.controllers', ['ionic', 'app.services'])

    .controller('groupTabPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

    .controller('loginCtrl',
        ['$scope', '$state', '$stateParams', 
            '$ionicPopup', '$ionicLoading', '$timeout', 
            'loginService',
            // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
            // You can include any angular dependencies as parameters for this function
            // TIP: Access Route Parameters for your page via $stateParams.parameterName
            function ($scope, $state, $stateParams, $ionicPopup, $ionicLoading, $timeout, loginService) {
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
                            $state.go('tabsController.home');
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
                }
            }])

    .controller('signupCtrl', 
        ['$scope', '$stateParams', 
            '$ionicLoading', '$ionicPopup',
            'loginService',
            // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
            // You can include any angular dependencies as parameters for this function
            // TIP: Access Route Parameters for your page via $stateParams.parameterName
            function ($scope, $stateParams, $ionicLoading, $ionicPopup, loginService) {
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
                            .then(function(){
                                loginService.sendVerification();
                                $ionicLoading.hide();
                                console.log("registered")
                            })
                            .catch(function(error){ 
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: 'Invalid Input',
                                    template: error
                                });
                            });
                    }
                }
            }])

    .controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

    .controller('groupDetailCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

    .controller('profileCtrl', ['$scope', '$state', '$stateParams', 'loginService',
        // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $state, $stateParams, loginService) {
            $scope.signout = function() {
                loginService.signout();
            }
            
            $scope.editProfile = function(){
                console.log("button edit profile clicked");
                $state.go('tabsController.editProfile');
            }
        }])


    .controller('editProfileCtrl', ['$scope', '$state','$stateParams', 'profileService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $state, $stateParams, profileService) {
            $scope.profileForm = {}
            
            $scope.updateProfile = function(){
                // TODO update the user's database entry
                var name = $scope.profileForm.name;
                var email = $scope.profileForm.email;
                var phone = $scope.profileForm.phone;
                var description = $scope.profileForm.description;
                
                console.log("button update profile clicked");
                profileService.updateProfile(name, email, phone, description);
                                    
                $state.go('tabsController.profile');
            };

        }])


    .controller('newStudyGroupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])
;