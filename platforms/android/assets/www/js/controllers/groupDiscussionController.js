angular.module('app.groupDiscussionController',
    ['ionic',
        'app.userDatabaseService',
        'app.groupDatabaseService',
    ])

    .controller('groupDiscussionCtrl',
        ['$scope', '$stateParams', '$state', '$ionicHistory', '$ionicPopup',
            '$ionicLoading','profileService', 'userCourseGroupService', 'groupDatabaseService',
            function($scope, $stateParams, $state, $ionicHistory, $ionicPopup, $ionicLoading,
                    profileService, userCourseGroupService, groupDatabaseService){
                $scope.id = $stateParams.group.id;
                $scope.group = $stateParams.group;
                $scope.items = [];
                $scope.message = {};
                console.log('group discussion: ' + $scope.id);
                $scope.writing = false;
                //$scope.group = group;
                
                function loadPosts(){
                    $ionicLoading.show({
                            template: 'Joining',
                            delay: 50
                    })
                    $scope.items = groupDatabaseService.getPosts($scope.id).then(function(res){
                            $scope.items = res;
                            $ionicLoading.hide();
                        }).catch(function(){
                            $ionicLoading.hide();
                            console.log('error loading posts');
                    });
                }
                
                $scope.refreshItems = loadPosts();
                
                $scope.writePost = function(){
                    $scope.writing = true;
                }
                
                $scope.cancelPost = function(){
                    $scope.writing = false;
                    $scope.message.content = '';
                }
                
                $scope.submitPost = function(){
                    console.log('writing'  + $scope.content);
                    groupDatabaseService.writePost($scope.id, $scope.message.content).then(function(){
                        loadPosts();
                        
                        $scope.message.content = '';
                        $scope.writing = false;
                    })
                }
                
                loadPosts();
            }
        ])

