angular.module('app.courseGroupsController',
    ['ionic', 
     'app.services', 'app.courseDatabaseService',
     'jett.ionic.filter.bar'])

    .controller('courseGroupsCtrl',
        ['$scope', '$stateParams',
        '$state', '$ionicLoading', 'courseDatabaseService',
        function ($scope,
            $stateParams, $state, $ionicLoading, courseDatabaseService) {
                var course = $stateParams.course;
                $scope.course = course;
                console.log(course.department+course.number);

                function getItems () {
                    $scope.items = [];
                    $ionicLoading.show({
                        template: 'Loading',
                        delay: 50
                    });
                    return courseDatabaseService.getGroups(course.id)
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
                    $state.go('tabsController.groupDetail',{
                        group: group
                    })
                }

                $scope.addGroup = function() {
                    $state.go('tabsController.newStudyGroup', {
                        course: course
                    });
                }
                
                if ($stateParams.updateRequired) {
                    // force refresh
                    console.log("update is required");
                    getItems();
                }
            }])

