angular.module('app.viewMemberProfileController', ['ionic', 'jett.ionic.filter.bar',
    'app.userDatabaseService'])

    .controller('viewMemberProfileCtrl', ['$scope', '$state', '$stateParams',
        '$ionicLoading', 'loginService', 'profileService',

        function ($scope, $state, $stateParams,
            $ionicLoading, loginService, profileService) {
                console.log("in viewmemberprofilecontroler");
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
                            if (!res.avatar) {
                                res.avatar = profileService.getDefaultAvatar();
                            }
                            $scope.profile = res;
                            $ionicLoading.hide();
                        }).catch(function(error){
                            console.log("error !" + error);
                            $ionicLoading.hide();
                        });
                }

                retrieveProfile();

            }])
