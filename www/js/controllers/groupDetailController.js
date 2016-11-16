angular.module('app.groupDetailController', 
    ['ionic',
        'app.userDatabaseService',
        'app.groupDatabaseService',
    ])

    .controller('groupDetailCtrl',
        ['$scope', '$stateParams', '$state', '$ionicHistory',
            '$ionicLoading','profileService', 'userCourseGroupService', 'groupDatabaseService', 
            function($scope, $stateParams, $state, $ionicHistory, $ionicLoading, 
                profileService, userCourseGroupService, groupDatabaseService){
                    var group = $stateParams.group;
                    $scope.group = group;

                    $scope.join = function(){
                        $ionicLoading.show({
                            template: 'Joining',
                            delay: 50
                        })
                        userCourseGroupService.addGroupMember(group.id).then(function(){
                            // joined
                            groupDatabaseService.getGroup(group.id).then(function(p){
                                group = p;
                                loadGroupInfo();
                                $ionicLoading.hide();
                            }).catch(function(){
                                $ionicLoading.hide();
                            });
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
                        var uid = profileService.getCurrentUserId();
                        if (group.members && (uid in group.members)) {
                            $scope.joined = true;
                        } else {
                            $scope.joined = false;
                        }
                        updateMember();
                    }

                    $scope.editGroup = function(){
                        $scope.editing = true;
                    }

                    $scope.updateGroup = function(){
                        $ionicLoading.show({
                            template: 'Joining',
                            delay: 50
                        })
                        groupDatabaseService.updateGroup(group).then(function(){
                            $scope.editing = false;
                            $ionicLoading.hide();
                            loadGroupInfo();
                        }).catch(function(){
                            $scope.editing = false;
                            $ionicLoading.hide();
                        });
                    };

                    loadGroupInfo();
                }
        ])

