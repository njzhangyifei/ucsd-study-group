angular.module('app.profileController', ['ionic', 'ngCordova', 'jett.ionic.filter.bar',
    'app.userDatabaseService'])

    .controller('profileCtrl', ['$scope', '$state', '$stateParams', '$cordovaImagePicker',
        '$ionicLoading', '$ionicPlatform', 'loginService', 'profileService',

        /*Check if is current user to control editprofile and signout in template*/
        function ($scope, $state, $stateParams, $cordovaImagePicker,
            $ionicLoading, $ionicPlatform, loginService, profileService) {
                $scope.profile = {};
                if(!$stateParams.uid)
                    $scope.isCurrentUser = true;
                else
                    $scope.isCurrentUser = false;
                /* Retrieve profile and avatar */
         function retrieveProfile () {
                    //Delay of loading for animation porposes.
                    $ionicLoading.show({
                        template: 'Loading',
                        delay: 50
                    });
                    profileService.getProfile($stateParams.uid)
                        .then(function(res){
                          //If no avatar has been set then get default avatar from database
                            if (!res.avatar) {
                                $scope.profile.avatar = profileService.getDefaultAvatar();
                            }
                          //set profile to result
                            $scope.profile = res;
                            $ionicLoading.hide();
                        }).catch(function(error){
                            console.log("error !" + error);   //Error catching. 
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

                /*update the user's database entry*/
                $scope.updateProfile = function(){
                    
                    var name = $scope.profile.name;
                    var email = $scope.profile.email;
                    var phone = $scope.profile.phone;
                    var description = $scope.profile.description;

                    console.log("button update profile clicked");
                    profileService.updateProfile(name, email, phone, description);

                    $scope.editing = false;
                    retrieveProfile();
                };
                /* Format the avatar picture and restrict user to pick only one picture */
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
                                //No picture selected.
                                if (!res || !res[0]) {      
                                    return;
                                }
                                //Delay for animation purposes.
                                $ionicLoading.show({            
                                    template: 'Uploading...',   
                                    delay: 50
                                });
                                console.log(res[0]);
                                //Convert selected picture into BASE64 string and set to avatar
                                window.plugins.Base64.encodeFile(res[0], function(d){
                                    $scope.profile.avatar = d;
                                });
                                // Set user avatar
                                profileService.setAvatar(res[0])
                                    .then(function(){
                                        console.log("uploaded")
                                        $ionicLoading.hide();
                                    })
                            }).catch(function(error){
                                console.log(error);
                            })
                    }
                })

        }])
