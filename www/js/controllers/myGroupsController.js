angular.module('app.myGroupsController', 
    ['ionic', 
        'app.stateParamsService',
        'app.services', 'jett.ionic.filter.bar', 'app.userDatabaseService'])

    .controller('myGroupsCtrl', ['$scope', 
        '$stateParams', '$state', '$ionicLoading', 
        'userCourseGroupService', 'stateParamsService',
        function ($scope, $stateParams, $state, $ionicLoading,
            userCourseGroupService, stateParamsService) {

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
                stateParamsService.setStateParams('tabsController.groupDetail', {
                    group: item
                })
                $state.go('tabsController.groupDetail');
            }

            if ($stateParams.updateRequired) {
                // force refresh
                console.log("update is required");
                getItems();
            }
        }])

