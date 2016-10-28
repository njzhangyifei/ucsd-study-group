angular.module('app.userDatabaseService', ['ionic', 'app.courseDatabaseService'])
    .service('userCourseGroupService', ['courseDatabaseService',
        function(courseDatabaseService){
            var rootPath = "UsersCourseGroup/";
            var coursesPath = "Courses/"
            var groupsPath = "Groups/"
            return {
                getUserCourses: function(){
                    var db = firebase.database();
                    var uid = firebase.auth().currentUser.uid;
                    var path = rootPath + uid + "/" + coursesPath;

                    var coursesRef = db.ref(path);
                    return coursesRef.once('value').then(function(snapshot){
                        var courses = [];
                        snapshot.forEach(function(childSnapshot){
                            // query for name
                            // courses.push
                            var course = 
                                courseDatabaseService
                                .getCourse(childSnapshot.val());
                            courses.push(course);
                        })
                        return Promise.all(courses);
                    });
                },

                addUserCourse: function(courseId){
                    var db = firebase.database();
                    var uid = firebase.auth().currentUser.uid;
                    var path = rootPath + uid + "/" + coursesPath;
                    var coursesRef = db.ref(path);
                    return coursesRef.push(courseId);
                }
            }
        }])
;

