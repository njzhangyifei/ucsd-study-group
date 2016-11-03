angular.module('app.profileController', ['ionic', 'jett.ionic.filter.bar',
                                         'app.userDatabaseService'])
    
    .controller('profileCtrl', ['$scope', '$state', '$stateParams', 
                                '$ionicLoading', 'loginService', 'profileService',
        
        function ($scope, $state, $stateParams, 
                    $ionicLoading, loginService, profileService) {
            
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
                        $scope.profile.name = res.name;
                        $scope.profile.email = res.email;
                        $scope.profile.phone = res.phone;
                        $scope.profile.description = res.description;
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

        }])
