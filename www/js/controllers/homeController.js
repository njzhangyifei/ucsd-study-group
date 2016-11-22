angular.module('app.homeController',
    ['ionic', 'app.services', 'jett.ionic.filter.bar', 
        'app.userDatabaseService', 'app.stateParamsService'])

    .controller('homeCtrl', ['$scope', '$stateParams',
        '$state', '$ionicLoading', '$ionicHistory', 'userCourseGroupService', 'stateParamsService',
        function ($scope,
            $stateParams, $state, $ionicLoading, $ionicHistory,
            userCourseGroupService, stateParamsService) {
            function getItems () {
                $scope.items = [];
                $ionicLoading.show({
                    template: 'Loading',
                    delay: 50
                });
                userCourseGroupService.getUserCourses()
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

            if ($stateParams.updateRequired) {
                // force refresh
                console.log("update is required");
                getItems();
            }

            $scope.addCourse = function() {
                $state.go('tabsController.addCourse');
            }

            $scope.selectedItem = function(item){
                stateParamsService.setStateParams('tabsController.courseGroups', 
                    {course: item, updateRequired:true});
                $state.go('tabsController.courseGroups');
            }
        }])

