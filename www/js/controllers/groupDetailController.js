angular.module('app.groupDetailController',
    ['ionic',
        'app.stateParamsService',
        'app.userDatabaseService',
        'app.groupDatabaseService',
    ])

    .controller('groupDetailCtrl',
        ['$scope', '$state', '$ionicHistory', '$ionicPopup',
            '$ionicLoading','profileService', 'userCourseGroupService', 'groupDatabaseService',
            'stateParamsService',
            function($scope, $state, $ionicHistory, $ionicPopup, $ionicLoading,
                profileService, userCourseGroupService, groupDatabaseService, stateParamsService){
                    $stateParams = stateParamsService.getStateParams('tabsController.groupDetail');
                    $scope.group = $stateParams.group;
                    console.log($scope.group);
                    $scope.creator = ($scope.group.creator == profileService.getCurrentUserId());
                    $scope.join = function(){
                        $ionicLoading.show({
                            template: 'Joining',
                            delay: 50
                        })
                        userCourseGroupService.addGroupMember($scope.group.id).then(function(){
                            // joined
                            groupDatabaseService.getGroup($scope.group.id).then(function(p){
                                $scope.group = p;
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
                        for (var key in $scope.group.members){
                            membersProfilesPromises.push(
                                profileService.getProfile($scope.group.members[key])
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
                    };

                    function loadGroupInfo(){
                        var uid = profileService.getCurrentUserId();

                        $ionicLoading.show({
                            template: 'Loading',
                            delay: 50
                        })
                        groupDatabaseService.getGroup($scope.group.id).then(function(p){
                                console.log(p);
                                $scope.group = p;
                                $ionicLoading.hide();
                                if ($scope.group.members && (uid in $scope.group.members)) {
                                    $scope.joined = true;
                                } else {
                                    $scope.joined = false;
                                }
                                updateMember();
                            }).catch(function(){
                                $ionicLoading.hide();
                            });
                    };

                    $scope.editGroup = function(){
                        $scope.editing = true;
                    };

                    $scope.viewDiscussion = function(){
                        console.log("group discussion clicked");
                        $state.go('tabsController.groupDiscussion', {group: $scope.group});
                    }

                    $scope.viewMember = function(member) {
                        var memberID = member.id;
                        console.log(memberID);
                        $state.go('tabsController.memberProfile', {uid: memberID});
                    }

                    $scope.updateGroup = function(){
                        $ionicLoading.show({
                            template: 'Loading',
                            delay: 50
                        })
                        groupDatabaseService.updateGroup($scope.group).then(function(){
                            $scope.editing = false;
                            $ionicLoading.hide();
                            loadGroupInfo();
                        }).catch(function(){
                            $scope.editing = false;
                            $ionicLoading.hide();
                        });
                    };

                    $scope.leaveGroup = function(){
                        var confirmPopup = $ionicPopup.confirm({
                            title:'Leave Group',
                            template:'Are you sure you want to leave this group?'
                        })

                        confirmPopup.then(function(ans){
                            if(ans){
                                userCourseGroupService.removeGroupMember($scope.group.id).then(function(){
                                    loadGroupInfo();
                                })
                                $scope.joined = false;
                            }
                        })
                    };

                    $scope.viewMeeting = function(){
                        $state.go('tabsController.groupMeeting', {group: $scope.group});
                    };

                    loadGroupInfo();
                }
        ])

