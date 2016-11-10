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
                    // var membersProfiles = {};
                    // var updateMember = function(){
                        // group.members.forEach(function(memberId){
                            // membersProfiles.push()
                        // })
                    // }

                    // function loadGroupInfo(){
                        // $ionicLoading.show({
                            // template: 'Loading',
                            // delay: 50
                        // })
                        // groupDatabaseService.getGroup(group.key)
                            // .then(function(res){
                                // console.log(res);
                                // $scope.group = res;
                                // $scope.items = [];
                                // $ionicLoading.hide();
                            // }).catch(function(error){
                                // console.log("error !" + error);
                                // $ionicLoading.hide();
                            // });
                    // }

                }
        ])

