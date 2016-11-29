angular.module('app.viewMemberProfileController', ['ionic', 'jett.ionic.filter.bar',
    'app.userDatabaseService'])

    .controller('viewMemberProfileCtrl', ['$scope', '$state', '$stateParams',
        '$ionicLoading', 'loginService', 'profileService',
    /*Check if is current user to control editprofile and signout in template*/
        function ($scope, $state, $stateParams,
            $ionicLoading, loginService, profileService) {
                console.log("in viewmemberprofilecontroler");
                $scope.profile = {};
                if(!$stateParams.uid)
                    $scope.isCurrentUser = true;
                else
                    $scope.isCurrentUser = false;
            /* Delay of retrieving profile for animation purposes*/
                function retrieveProfile () {
                    $ionicLoading.show({
                        template: 'Loading',
                        delay: 50
                    });
                /* Get profile from result */      
                    profileService.getProfile($stateParams.uid)
                        .then(function(res){
                   //If no avatar has been set then get default avatar from database          
                            if (!res.avatar) {
                                res.avatar = profileService.getDefaultAvatar();
                            }
                            //set profile to result
                            $scope.profile = res;
                            $ionicLoading.hide();
                        }).catch(function(error){
                            console.log("error !" + error);  //Error catching.
                            $ionicLoading.hide();
                        });
                }
                //Call to retrieve profile.
                retrieveProfile();

            }])
