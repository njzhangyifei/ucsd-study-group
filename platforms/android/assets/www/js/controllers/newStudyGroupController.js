angular.module('app.newStudyGroupController',
    ['ionic', 'app.services', 'jett.ionic.filter.bar', 
        'app.courseDatabaseService', 'app.stateParamsService',
        'app.groupDatabaseService', 'app.userDatabaseService'])
    .controller('newStudyGroupCtrl',
        ['$scope', '$ionicHistory', '$ionicPopup','$ionicLoading', 
            'groupDatabaseService', 'courseDatabaseService', 'userCourseGroupService', 'stateParamsService',
            // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
            // You can include any angular dependencies as parameters for this function
            // TIP: Access Route Parameters for your page via $stateParams.parameterName
            function ($scope, $ionicHistory, $ionicPopup, $ionicLoading, 
                groupDatabaseService, courseDatabaseService, userCourseGroupService, stateParamsService) {
                    $stateParams = stateParamsService.getStateParams();
                    var course = $stateParams.course;
                    console.log('new study group for ' + course.department
                        +  ' ' + course.number);
                    $scope.groupForm = {};
                    $scope.createGroup = function(){
                        var group = {};
                        //var hasName = false;
                        // if($scope.groupForm.name) {
                        //  hasName = true;
                        // } else {
                        //   return "Please enter a name for your group"
                        // }
                        group.name = $scope.groupForm.name;
                        group.description = $scope.groupForm.description;

                        $ionicLoading.show();
                        courseDatabaseService.getGroups(course.id).then(function(res){
                            $ionicLoading.hide();
                            $scope.items = [];
                            for (var i = res.length - 1; i >= 0; i--) {
                                var t = res[i];
                                if (t.name == group.name) {
                                    console.log("failed!");
                                    $ionicPopup.alert({
                                        title: 'Invalid Group Name',
                                        template: 'Group name "' + group.name + '" has been taken!'
                                    });
                                    return;
                                }
                            }

                            if (!group.description) {
                                $ionicPopup.alert({
                                    title: 'Empty Group Description',
                                    template: 'Please enter the description for the group'
                                });
                                return;
                            }

                            console.log('valid input' + group.name);
                            var groupRef = groupDatabaseService.createGroup(group);
                            groupRef.then(function(){
                                var k = groupRef.key;
                                console.log("group added - key: " + k);
                                courseDatabaseService.addGroup(groupRef.key, course.id);
                                userCourseGroupService.addGroupMember(groupRef.key);
                            });

                            $ionicHistory.goBack();
                        }).catch(function(error){
                            console.log("error :" + error);
                            $ionicLoading.hide();
                        });

                        //add creator?
                        // TODO need to link course to the group
                        // groupDatabaseService.createGroup(group);
                    }
                }])

