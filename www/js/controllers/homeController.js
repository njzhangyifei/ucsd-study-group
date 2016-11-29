// module injection
angular.module('app.homeController',
    ['ionic', 'app.services', 'jett.ionic.filter.bar', 
        'app.userDatabaseService', 'app.stateParamsService'])

    // dependency injection
    .controller('homeCtrl', ['$scope', '$stateParams',
        '$state', '$ionicLoading', '$ionicHistory', 'userCourseGroupService', 'stateParamsService',
        function ($scope,
            $stateParams, $state, $ionicLoading, $ionicHistory,
            userCourseGroupService, stateParamsService) {

            // function for loading the courses of the user
            function getItems () {
                $scope.items = [];
                $ionicLoading.show({
                    template: 'Loading',
                    delay: 50
                });
                // async call for loading the user's coures
                userCourseGroupService.getUserCourses()
                    .then(function(res){
                        // get course info from key
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

            // update is required
            if ($stateParams.updateRequired) {
                // force refresh
                console.log('update is required');
                getItems();
            }

            // add course controller
            $scope.addCourse = function() {
                // state transition
                $state.go('tabsController.addCourse');
            }

            // course selected callback
            $scope.selectedItem = function(item){
                // update the state param for the course group
                stateParamsService.setStateParams('tabsController.courseGroups', 
                    {course: item, updateRequired:true});
                // state transition
                $state.go('tabsController.courseGroups');
            }
        }])

