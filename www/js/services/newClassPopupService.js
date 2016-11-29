// module injection
angular.module('app.newClassPopupService', ['ionic'])
    // dependency injection
    .service('newClassPopupService', ['$ionicPopup', '$rootScope',
        function($ionicPopup, $rootScope){
            // validity check for course object
            var validityCheck = function(course){
                var department = course.department;
                var number = course.number;
                if (isNaN(number)) {
                    return false;
                }
                return true;
            }

            return {
                // show the popup
                show: function() {
                    // An elaborate, custom popup
                    scope = $rootScope.$new(true);
                    scope.course = {};
                    var myPopup = $ionicPopup.show({
                        // pop up template
                        template: '<h5>Department</h5><input ng-model="course.department"><h5>Number</h5><input ng-model="course.number">',
                        title: 'Enter Course Department and Number',
                        scope: scope,
                        // button template
                        buttons: [
                            { text: 'Cancel' },
                            {
                                text: '<b>Confirm</b>',
                                type: 'button-positive',
                                onTap: function(e) {
                                    // read the input and construct the object
                                    if (!scope.course.department || !scope.course.number) {
                                        // hide the keyboard
                                        e.preventDefault();
                                    } else {
                                        // do some trims
                                        scope.course.department.trim();
                                        scope.course.department =
                                            scope.course.department.toUpperCase();
                                        scope.course.number.trim();
                                        if (!validityCheck(scope.course)) {
                                            // hide the keyboard
                                            e.preventDefault();
                                        } else {
                                            return scope.course;
                                        }
                                    }
                                }
                            }
                        ]
                    });
                    // return the popup object
                    return myPopup;
                }
            }
        }])

;
