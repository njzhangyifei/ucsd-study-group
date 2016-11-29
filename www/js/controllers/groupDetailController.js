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
                    $scope.isCreator = ($scope.group.creator == profileService.getCurrentUserId());
                    
                    console.log('groupDetail- group: ' + $scope.group);
                
                    // join group button
                    $scope.join = function(){
                        $ionicLoading.show({
                            template: 'Joining',
                            delay: 50
                        })
                        userCourseGroupService.addGroupMember($scope.group.id).then(function(){
                            // successfully joined
                            loadGroupInfo();
                            $ionicLoading.hide();
                        }).catch(function(error){
                            console.log('groupDetail- error joining group! ' + error);
                            $ionicLoading.hide();
                        });
                    };
                
                    // leave group button
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
                            }
                        })
                    };

                    // retrieve member profiles for display
                    var loadMembers = function(){
                        $ionicLoading.show({
                            template: 'Loading',
                            delay: 50
                        })
                        
                        // generate a list of promises and resolve them
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
                            $scope.$apply();
                        })
                        $ionicLoading.hide();
                    };
                
                    // retrieve group from dtatabase
                    function loadGroupInfo(){
                        var uid = profileService.getCurrentUserId();

                        $ionicLoading.show({
                            template: 'Loading',
                            delay: 50
                        })
                        groupDatabaseService.getGroup($scope.group.id).then(function(group){
                                console.log(group);
                                $scope.group = group;
                                $ionicLoading.hide();
                            
                                // updated joined variable
                                if ($scope.group.members && (uid in $scope.group.members)) {
                                    $scope.joined = true;
                                } else {
                                    $scope.joined = false;
                                }
                                loadMembers();
                            }).catch(function(){
                                $ionicLoading.hide();
                            });
                    };
                
                    // write group changes to database
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
                
                    // edit group button
                    $scope.editGroup = function(){
                        $scope.editing = true;
                    };
                    
                    // go to group discussion page
                    $scope.viewDiscussion = function(){
                        console.log("group discussion clicked");
                        $state.go('tabsController.groupDiscussion', {group: $scope.group});
                    };
                    
                    // go to member's profile page
                    $scope.viewMember = function(member) {
                        var memberID = member.id;
                        console.log(memberID);
                        $state.go('tabsController.memberProfile', {uid: memberID});
                    };
                
                    
                    // go to group meeting page
                    $scope.viewMeeting = function(){
                        $state.go('tabsController.groupMeeting', {group: $scope.group});
                    };

                    loadGroupInfo();
                }
        ])

