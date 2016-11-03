angular.module('app.newStudyGroupController', 
    ['ionic', 'app.services', 'jett.ionic.filter.bar', 'app.userDatabaseService'])

    .controller('newStudyGroupCtrl', 
                ['$scope', '$stateParams', 'groupDatabaseService',
                                      // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, groupDatabaseService) {
            $scope.createGroup = function(){
                var group = {};
                group.name = $scope.name;
                group.description = $scope.description;
                
                groupDatabaseService.createGroup(group);
            }

    }])