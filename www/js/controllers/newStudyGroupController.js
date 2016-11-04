angular.module('app.newStudyGroupController',
    ['ionic', 'app.services', 'jett.ionic.filter.bar', 'app.userDatabaseService'])

    .controller('newStudyGroupCtrl',
        ['$scope', '$stateParams', 'groupDatabaseService', 'courseDatabaseService',
            // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
            // You can include any angular dependencies as parameters for this function
            // TIP: Access Route Parameters for your page via $stateParams.parameterName
            function ($scope, $stateParams, groupDatabaseService, courseDatabaseService) {
                console.log("new study group for " + $stateParams.course.name);

                $scope.createGroup = function(){
                    $scope.groupForm = {};
                    var group = {};
                    //var hasName = false;
                    // if($scope.groupForm.name) {
                    //  hasName = true;
                    // } else {
                    //   return "Please enter a name for your group"
                    // }
                    group.name = $scope.groupForm.name;
                    group.description = $scope.groupForm.description;

                    var groupRef = groupDatabaseService.createGroup(group);
                    groupRef.then(function(){
                        var k = groupRef.key();
                        console.log(k);
                    });
                    courseDatabaseService.addGroup(group);
                    //add creator?
                    // TODO need to link course to the group
                    // groupDatabaseService.createGroup(group);
                }
            }])

