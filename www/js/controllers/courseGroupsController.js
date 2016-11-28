angular.module('app.courseGroupsController',
    ['ionic',
     'app.services', 'app.courseDatabaseService', 'app.stateParamsService',
     'jett.ionic.filter.bar'])

    .controller('courseGroupsCtrl',
        ['$scope', '$state', '$ionicLoading', 'courseDatabaseService', 'stateParamsService',
        function ($scope, $state, $ionicLoading, courseDatabaseService, stateParamsService) {
                $stateParams = stateParamsService.getStateParams();
                $scope.course = $stateParams.course;

                function getItems () {
                    $scope.items = [];
                    $ionicLoading.show({
                        template: 'Loading',
                        delay: 50
                    });
                    return courseDatabaseService.getGroups($stateParams.course.id)
                        .then(function(res){
                            $scope.items = [];
                            res.forEach(function(t){
                                $scope.items.push(t)
                            })
                            $ionicLoading.hide();
                        }).catch(function(error){
                            console.log("error !" + error);
                            $ionicLoading.hide();
                        });
                }

                $scope.refreshItems = function () {
                    getItems().then(function(){
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                };

                $scope.selectedItem = function(group){
                    stateParamsService.setStateParams('tabsController.groupDetail', {
                        group: group
                    })
                    $state.go('tabsController.groupDetail')
                }

                $scope.addGroup = function() {
                    stateParamsService.setStateParams('tabsController.newStudyGroup', {
                        course: $stateParams.course
                    })
                    $state.go('tabsController.newStudyGroup');
                }

                if ($stateParams.updateRequired) {
                    // force refresh
                    console.log("update is required");
                    getItems();
                }
            }])

