angular.module('app.groupDetailController', 
    ['ionic',
        'app.userDatabaseService',
    ])

    .controller('groupDetailCtrl',
        ['$scope', '$stateParams', '$state',
            '$ionicLoading','profileService', 'userCourseGroupService',
            function($scope, $stateParams, $state, $ionicLoading, 
                profileService, userCourseGroupService){
                    var group = $stateParams.group;
                    $scope.group = group;

                    $scope.join = function(){
                        $ionicLoading.show({
                            template: 'Joining',
                            delay: 50
                        })
                        console.log(group);
                        userCourseGroupService.addGroupMember(group.key).then(function(){
                            loadGroupInfo();
                            $ionicLoading.hide();
                            // joined
                        }).catch(function(error){
                            console.log("error joining group! " + error);
                            $ionicLoading.hide();
                        });
                    }

                    //generate a list of promises and resolve them
                    var updateMember = function(){
                        $ionicLoading.show({
                            template: 'Loading',
                            delay: 50
                        })
                        var membersProfilesPromises = [];
                        for (var key in group.members){
                            membersProfilesPromises.push(
                                profileService.getProfile(group.members[key])
                            )
                        }
                        var p = Promise.all(membersProfilesPromises);
                        p.then(function(res){
                            var membersProfiles = [];
                            res.forEach(function(profile){
                                membersProfiles.push(profile);
                            })
                            $scope.members = membersProfiles;
                        })
                        $ionicLoading.hide();
                    }

                    function loadGroupInfo(){
                        updateMember();
                    }

                    loadGroupInfo();
                }
        ])

