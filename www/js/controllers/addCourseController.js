angular.module('app.addCourseController',
    ['ionic', 'app.services', 'jett.ionic.filter.bar', 'app.userDatabaseService'])

    .controller('addCourseCtrl', [
        '$scope', '$stateParams', '$state', '$ionicFilterBar', '$ionicLoading',
        '$ionicHistory', 'newClassPopupService', 'courseDatabaseService', 'userCourseGroupService',
        function ($scope, $stateParams, $state,
            $ionicFilterBar, $ionicLoading, $ionicHistory,
            newClassPopupService, courseDatabaseService, userCourseGroupService) {
                var filterBarInstance;
                //Get items from database
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
                //Show filter bar
                $scope.showFilterBar = function () {
                    filterBarInstance = $ionicFilterBar.show({
                        items: $scope.items,
                        update: function (filteredItems, filterText) {
                            $scope.items = filteredItems;
                        }
                    });
                };
                //Refresh items
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

                //Select course from list
                $scope.selectedItem = function(item) {
                    console.log("adding course");
                    userCourseGroupService.addUserCourse(item.courseId);
                    $ionicHistory.nextViewOptions({disableBack: true});
                    $ionicHistory.backView().stateParams={updateRequired:true};
                    $ionicHistory.goBack();
                };
                //Add new course to database
                $scope.addNewCourse = function() {
                    newClassPopupService.show().then(function(res){
                        if (res) {
                            // course added
                            $ionicLoading.show({
                                template: 'Loading',
                                delay: 50
                            });
                            //Create course in database
                            courseDatabaseService.createCourse(res)
                                .then(
                                    function() {
                                        getItems();
                                        $ionicLoading.hide();
                                    }
                                )
                                .catch(
                                    //Error when writing course to database
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
