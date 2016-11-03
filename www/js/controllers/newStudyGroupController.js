angular.module('app.newStudyGroupController',
    ['ionic', 'app.services', 'jett.ionic.filter.bar', 'app.userDatabaseService'])

    .controller('newStudyGroupCtrl',
        ['$scope', '$stateParams', 'groupDatabaseService',
            // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
            // You can include any angular dependencies as parameters for this function
            // TIP: Access Route Parameters for your page via $stateParams.parameterName
            function ($scope, $stateParams) {
                console.log("new study group for " + $stateParams.course.name);

                $scope.createGroup = function(){
                    $scope.groupForm = {};
                    $scope.createGroup = function(){
                        var group = {};
                        group.name = $scope.groupForm.name;
                        group.description = $scope.groupForm.description;
                        // TODO need to link course to the group
                        // groupDatabaseService.createGroup(group);
                    }
                }
            }])
;
