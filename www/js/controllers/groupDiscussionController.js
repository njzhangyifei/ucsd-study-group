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
                    var group = $stateParams.group;
                    $scope.group = group;
                    $scope.items = [
                        {user: 'user1', date: 'T', content: "test1"},
                        {user: 'user2', date: 'T', content: "test2"},
                    ]
            }
        ])

