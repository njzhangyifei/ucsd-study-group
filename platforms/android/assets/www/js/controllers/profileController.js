angular.module('app.profileController', ['ionic', 'ngCordova', 'jett.ionic.filter.bar',
    'app.userDatabaseService'])

    .controller('profileCtrl', ['$scope', '$state', '$stateParams', '$cordovaImagePicker',
        '$ionicLoading', '$ionicPlatform', 'loginService', 'profileService',

        function ($scope, $state, $stateParams, $cordovaImagePicker,
            $ionicLoading, $ionicPlatform, loginService, profileService) {

                $scope.profile = {};
                if(!$stateParams.uid)
                    $scope.isCurrentUser = true;
                else
                    $scope.isCurrentUser = false;

                function retrieveProfile () {
                    $ionicLoading.show({
                        template: 'Loading',
                        delay: 50
                    });
                    profileService.getProfile($stateParams.uid)
                        .then(function(res){
                            $scope.profile = res;
                            $ionicLoading.hide();
                        }).catch(function(error){
                            console.log("error !" + error);
                            $ionicLoading.hide();
                        });
                }

                retrieveProfile();

                $scope.signout = function() {
                    loginService.signout();
                }

                $scope.editProfile = function(){
                    $scope.editing = true;
                }

                $scope.updateProfile = function(){
                    // TODO update the user's database entry
                    var name = $scope.profile.name;
                    var email = $scope.profile.email;
                    var phone = $scope.profile.phone;
                    var description = $scope.profile.description;

                    console.log("button update profile clicked");
                    profileService.updateProfile(name, email, phone, description);

                    $scope.editing = false;
                    retrieveProfile();
                };

                $ionicPlatform.ready(function() {
                    $scope.pickImage = function(){
                        var options = {
                            maximumImagesCount: 1,
                            width: 800,
                            height: 800,
                            quality: 80
                        };
                        $cordovaImagePicker.getPictures(options)
                            .then(function(res){
                                $ionicLoading.show({
                                    template: 'Uploading...',
                                    delay: 50
                                });
                                profileService.setAvatar(res[0])
                                    .then(function(){
                                        console.log("uploaded")
                                        profileService.getAvatar(profileService.getCurrentUserId())
                                            .then(function(d){
                                            $scope.profile.avatar = d;
                                        });
                                        $ionicLoading.hide();
                                    })
                            }).catch(function(error){
                                console.log(error);
                            })
                    }
                })

        }])
