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
                $scope.isWriting = false;
                
                console.log('group discussion: ' + $scope.id);
                
                // load messages from the database
                function loadPosts(){
                    $ionicLoading.show({
                            template: 'Loading',
                            delay: 50
                    })
                    
                    $scope.items = groupDatabaseService.getPosts($scope.id)
                        .then(function(res){
                            $scope.items = res;
                            $ionicLoading.hide();
                        }).catch(function(){
                            $ionicLoading.hide();
                            console.log('error loading posts');
                        });
                }
                
                // pull down refresh
                $scope.refreshItems = function(){
                    loadPosts();
                    $scope.$broadcast('scroll.refreshComplete');
                }
                
                // show post input and submit button
                $scope.writePost = function(){
                    $scope.isWriting = true;
                }
                
                // hide post input and submit button
                $scope.cancelPost = function(){
                    $scope.isWriting = false;
                    $scope.message.content = '';
                }
                
                // write post to database
                $scope.submitPost = function(){
                    console.log('groupDiscussion- writing: '  + $scope.content);
                    
                    groupDatabaseService.writePost($scope.id, $scope.message.content).then(function(){
                        loadPosts();
                        
                        $scope.message.content = '';
                        $scope.isWriting = false;
                    })
                }
                
                loadPosts();
            }
        ])

