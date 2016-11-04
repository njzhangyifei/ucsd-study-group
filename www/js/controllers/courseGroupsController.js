angular.module('app.courseGroupsController', 
    ['ionic', 'app.services', 'jett.ionic.filter.bar'])

    .controller('courseGroupsCtrl', ['$scope', 
        '$stateParams', 
        '$state', '$ionicLoading', 
        function ($scope, 
            $stateParams, $state, $ionicLoading) {
                $scope.course = $stateParams.course;

                function getItems () {
                    $scope.items = [];
                    // $ionicLoading.show({
                    // template: 'Loading',
                    // delay: 50
                    // });
                    // userCourseGroupService.getUserCourses()
                    // .then(function(res){
                    // $scope.items = [];
                    // res.forEach(function(t){
                    // $scope.items.push({
                    // name: t.department + " - " + t.number,
                    // key: t.key
                    // })
                    // })
                    // $ionicLoading.hide();
                    // }).catch(function(error){
                    // console.log("error !" + error);
                    // $ionicLoading.hide();
                    // });
                }

                $scope.addGroup = function() {
                    $state.go('tabsController.newStudyGroup', {
                        course: $stateParams.course
                    });
                }

                if ($stateParams.updateRequired) {
                    // force refresh
                    console.log("update is required");
                    getItems();
                }
            }])

