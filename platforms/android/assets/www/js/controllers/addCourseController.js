angular.module('app.addCourseController',
    ['ionic', 'app.services', 'jett.ionic.filter.bar', 'app.userDatabaseService'])

    .controller('addCourseCtrl', [
        '$scope', '$stateParams', '$state', '$ionicFilterBar', '$ionicLoading',
        '$ionicHistory', 'newClassPopupService', 'courseDatabaseService', 'userCourseGroupService',
        function ($scope, $stateParams, $state,
            $ionicFilterBar, $ionicLoading, $ionicHistory,
            newClassPopupService, courseDatabaseService, userCourseGroupService) {
                var filterBarInstance;

                function getItems () {
                    $scope.items = [];
                    $ionicLoading.show({
                        template: 'Loading',
                        delay: 50
                    });
                    return courseDatabaseService
                        .getAvailableCourses()
                        .then(function(snapshot){
                            snapshot.forEach(function(childSnapshot){
                                var childKey = childSnapshot.key;
                                var childData = childSnapshot.val();
                                $scope.items.push(
                                    {name: childKey, courseId: childData}
                                );
                            })
                            $ionicLoading.hide();
                        }).catch(function(error){
                            $ionicLoading.hide();
                        });
                }

                getItems();

                $scope.showFilterBar = function () {
                    filterBarInstance = $ionicFilterBar.show({
                        items: $scope.items,
                        update: function (filteredItems, filterText) {
                            $scope.items = filteredItems;
                        }
                    });
                };

                $scope.refreshItems = function () {
                    if (filterBarInstance) {
                        filterBarInstance();
                        filterBarInstance = null;
                    }

                    // load items here
                    getItems().then(function(){
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                };

                $scope.selectedItem = function(item) {
                    console.log("adding course")
                    userCourseGroupService.addUserCourse(item.courseId);
                    $ionicHistory.nextViewOptions({disableBack: true});
                    $ionicHistory.backView().stateParams={updateRequired:true};
                    $ionicHistory.goBack();
                };

                $scope.addNewCourse = function() {
                    newClassPopupService.show().then(function(res){
                        if (res) {
                            // course added
                            $ionicLoading.show({
                                template: 'Loading',
                                delay: 50
                            });
                            courseDatabaseService.createCourse(res)
                                .then(
                                    function() {
                                        getItems();
                                        $ionicLoading.hide();
                                    }
                                )
                                .catch(
                                    function() {
                                        console.log("Error writing to database");
                                        getItems();
                                        $ionicLoading.hide();
                                    }
                                )
                        }
                    });
                }
            }])
