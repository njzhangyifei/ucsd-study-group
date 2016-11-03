angular.module('app.newClassPopupService', ['ionic'])
    .service('newClassPopupService', ['$ionicPopup', '$rootScope',
        function($ionicPopup, $rootScope){
            var validityCheck = function(course){
                var department = course.department;
                var number = course.number;
                if (isNaN(number)) {
                    return false;
                }
                return true;
            }
            return {


                show: function() {
                    // An elaborate, custom popup
                    scope = $rootScope.$new(true);
                    scope.course = {};
                    var myPopup = $ionicPopup.show({
                        template: '<h5>Department</h5><input ng-model="course.department"><h5>Number</h5><input ng-model="course.number">',
                        title: 'Enter Course Department and Number',
                        scope: scope,
                        buttons: [
                            { text: 'Cancel' },
                            {
                                text: '<b>Confirm</b>',
                                type: 'button-positive',
                                onTap: function(e) {
                                    if (!scope.course.department || !scope.course.number) {
                                        e.preventDefault();
                                    } else {
                                        scope.course.department.trim();
                                        scope.course.department =
                                            scope.course.department.toUpperCase();
                                        scope.course.number.trim();
                                        if (!validityCheck(scope.course)) {
                                            e.preventDefault();
                                        } else {
                                            return scope.course;
                                        }
                                    }
                                }
                            }
                        ]
                    });
                    return myPopup;
                }
            }
        }])

;
