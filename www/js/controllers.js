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
                    if (user) {
                        // $ionicViewSwitcher.nextDirection(
                        $state.go('tabsController.home');
                    }
                    $ionicLoading.hide();
                })

                $scope.login = function(){
                    var email = $scope.loginForm.id;
                    var password = $scope.loginForm.password;

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
                };

                $scope.signup = function(){
                    console.log("button sign up clicked");
                    $state.go('signup');
                }
            }])

    .controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {

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

    .controller('profileCtrl', ['$scope', '$stateParams', 'loginService',
        // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, loginService) {
            $scope.signout = function() {
                loginService.signout();
            }
        }])

    .controller('newStudyGroupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

