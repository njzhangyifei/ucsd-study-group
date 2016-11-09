angular.module('app.myGroupsController', 
    ['ionic', 'app.services', 'jett.ionic.filter.bar', 'app.userDatabaseService'])

    .controller('myGroupsCtrl', ['$scope', 
        '$stateParams', '$state', '$ionicLoading', 
        'userCourseGroupService',
        function ($scope, $stateParams, $state, $ionicLoading, 
            userCourseGroupService) {

            function getItems () {
                $scope.items = [];
                $ionicLoading.show({
                    template: 'Loading',
                    delay: 50
                });
                userCourseGroupService.getUserGroups()
                    .then(function(res){
                        $scope.items = [];
                        res.forEach(function(t){
                            $scope.items.push(t);
                        })
                        $ionicLoading.hide();
                    }).catch(function(error){
                        console.log("error :" + error);
                        $ionicLoading.hide();
                    });
            }

            getItems();
            
            $scope.selectedItem = function(item){
                $state.go('tabsController.groupDetail', 
                    {group: item});
            }

            if ($stateParams.updateRequired) {
                // force refresh
                console.log("update is required");
                getItems();
            }
        }])

