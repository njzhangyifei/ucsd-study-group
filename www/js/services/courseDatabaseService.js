angular.module('app.courseDatabaseService', ['ionic'])
    .service('courseDatabaseService', [
        function($ionicPopup, $rootScope){
            var coursePath = "Courses/";
            var availableCoursesPath = "AvailableCourses/";
            return {
                createCourse: function(course){
                    // course department, course number
                    // check if exist
                    var db = firebase.database();
                    var courseName = course.department + course.number;
                    var idPath = availableCoursesPath+courseName;
                    var courseInfo = {
                        Department: course.department,
                        Number: course.number,
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
                            department : courseInfo.Department,
                            number : courseInfo.Number,
                            key : courseId
                        }
                        return course;
                    });
                },

                getAvailableCourses: function(){
                    var db = firebase.database();
                    var availCourseRef = db.ref(availableCoursesPath);
                    return availCourseRef.once('value');
                },


                // onAvailableCoursesChanged: function(func){
                    // var db = firebase.database();
                    // var availCourseRef = db.ref(availableCoursesPath);
                    // availCourseRef.on('child_added', function(snapshot){
                        // func(snapshot);
                    // });
                // },
            }
        }])
;
