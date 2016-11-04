angular.module('app.courseDatabaseService', ['ionic'])
    .service('courseDatabaseService', [
        function($ionicPopup, $rootScope){
            var coursePath = 'courses/';
            var groupPath = 'groups/'
            var availableCoursesPath = 'availableCourses/';
            var db = firebase.database();
            return {
                createCourse: function(course){
                    // course department, course number
                    // check if exist
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
                    var courseInfoRef = db.ref(coursePath+courseId);
                    return courseInfoRef.once('value').then(function(snapshot){
                        var courseInfo = snapshot.val();
                        var course = {
                            department : courseInfo.department,
                            number : courseInfo.number,
                            id : courseId
                        }
                        return course;
                    });
                },

                addGroup: function(gid){
                    return db.ref(coursePath + groupPath + gid).set(gid)
                },

                getGroups: function(courseId) {
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
                    var availCourseRef = db.ref(availableCoursesPath);
                    return availCourseRef.once('value');
                },

            }
        }])
;
