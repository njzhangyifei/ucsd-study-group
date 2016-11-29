// module injection
angular.module('app.courseGroupsController',
    ['ionic',
     'app.services', 'app.courseDatabaseService', 'app.stateParamsService',
     'jett.ionic.filter.bar'])

    // dependency injection
    .controller('courseGroupsCtrl',
        ['$scope', '$state', '$ionicLoading', 'courseDatabaseService', 'stateParamsService',
        function ($scope, $state, $ionicLoading, courseDatabaseService, stateParamsService) {
                // update the state params from the service
                $stateParams = stateParamsService.getStateParams();
                // update the object binded
                $scope.course = $stateParams.course;

                // function for getting the course infos from the database
                function getItems () {
                    $scope.items = [];
                    $ionicLoading.show({
                        template: 'Loading',
                        delay: 50
                    });
                    // load the course
                    return courseDatabaseService.getGroups($stateParams.course.id)
                        .then(function(res){
                            // load the course info async
                            $scope.items = [];
                            res.forEach(function(t){
                                $scope.items.push(t)
                            })
                            $ionicLoading.hide();
                        }).catch(function(error){
                            console.log('error !' + error);
                            $ionicLoading.hide();
                        });
                }

                // pull down to refresh
                $scope.refreshItems = function () {
                    getItems().then(function(){
                        // async callback
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                };

                // selected item callback
                $scope.selectedItem = function(group){
                    // update the state param
                    stateParamsService.setStateParams('tabsController.groupDetail', {
                        group: group
                    })
                    // transition
                    $state.go('tabsController.groupDetail')
                }

                // add a new group callback
                $scope.addGroup = function() {
                    // set stateparam for next view
                    stateParamsService.setStateParams('tabsController.newStudyGroup', {
                        course: $stateParams.course
                    })
                    // transition
                    $state.go('tabsController.newStudyGroup');
                }

                // update is required
                if ($stateParams.updateRequired) {
                    // force refresh
                    console.log('update is required');
                    getItems();
                }
            }])

