angular.module('app.newStudyGroupController',
    ['ionic', 'app.services', 'jett.ionic.filter.bar', 'app.userDatabaseService'])

    .controller('newStudyGroupCtrl',
        ['$scope', '$stateParams', '$ionicHistory', 'groupDatabaseService', 
         'courseDatabaseService', 'userCourseGroupService',
            // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
            // You can include any angular dependencies as parameters for this function
            // TIP: Access Route Parameters for your page via $stateParams.parameterName
            function ($scope, $stateParams, $ionicHistory, groupDatabaseService, 
                       courseDatabaseService, userCourseGroupService) {
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
                    
                    console.log(group.name);
                    var groupRef = groupDatabaseService.createGroup(group);
                    groupRef.then(function(){
                        var k = groupRef.key;
                        console.log("group added - key: " + k);
                        courseDatabaseService.addGroup(groupRef.key, course.id);
                        userCourseGroupService.addGroupMember(groupRef.key);
                    });
                    
                    $ionicHistory.goBack();
                    //add creator?
                    // TODO need to link course to the group
                    // groupDatabaseService.createGroup(group);
                }
            }])

