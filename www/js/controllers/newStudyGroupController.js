angular.module('app.newStudyGroupController', 
    ['ionic', 'app.services', 'jett.ionic.filter.bar', 'app.userDatabaseService'])

    .controller('newStudyGroupCtrl', 
                ['$scope', '$stateParams', 'groupDatabaseService',
                                      // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
<<<<<<< HEAD
        function ($scope, $stateParams, groupDatabaseService) {
            $scope.createGroup = function(){
                var group = {};
                group.name = $scope.name;
                group.description = $scope.description;
                
                groupDatabaseService.createGroup(group);
            }

    }])
=======
        function ($scope, $stateParams) {
            $scope.createGroup = function(){
                var group = {};
                // TODO
                // retrieve data from create group form
                //group.name = $scope.groupForm.name;
                //group.description = $scope.groupForm.description;
                
                groupDatabaseService.createGroup(group);
            }

    }])
;
>>>>>>> 3f00bdbd2dfcf692609f1bb87afcc6947365fe89
