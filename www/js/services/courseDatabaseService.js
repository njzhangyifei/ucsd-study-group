angular.module('app.courseDatabaseService', ['ionic'])
    .service('courseDatabaseService', [
        function($ionicPopup, $rootScope){
            var coursePath = 'courses/';
            var availableCoursesPath = 'availableCourses/';
            return {
                createCourse: function(course){
                    // course department, course number
                    // check if exist
                    var db = firebase.database();
                    var courseName = course.department + course.number;
                    var idPath = availableCoursesPath+courseName;
                    var courseInfo = {
                        department: course.department,
                        number: course.number,
                    }
                    var courseInfoRef = db.ref(coursePath).push(courseInfo);
                    return courseInfoRef.then(function(){
                        return db.ref(idPath).set(courseInfoRef.key);
                    });
                },

                getCourse: function(courseId){
                    var db = firebase.database();
                    var courseInfoRef = db.ref(coursePath+courseId);
                    return courseInfoRef.once('value').then(function(snapshot){
                        var courseInfo = snapshot.val();
                        var course = {
                            department : courseInfo.department,
                            number : courseInfo.number,
                            key : courseId
                        }
                        return course;
                    });
                },

                getGroups: function(courseId) {
                    var db = firebase.database();
                    var courseInfoRef = db.ref(coursePath+courseId);
                    return courseInfoRef.once('value').then(function(snapshot){
                        var groups = [];
                        snapshot.forEach(function(childSnapshot){
                            var group = 
                                groupDatabaseService.
                                    getGroup(childSnapshot.val());
                            groups.push(group);
                        })
                        return Promise.all(groups);
                    });
                },

                getAvailableCourses: function(){
                    var db = firebase.database();
                    var availCourseRef = db.ref(availableCoursesPath);
                    return availCourseRef.once('value');
                },

            }
        }])
;
