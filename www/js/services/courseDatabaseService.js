angular.module('app.courseDatabaseService', ['ionic', 'app.groupDatabaseService'])
    .service('courseDatabaseService', [ 'groupDatabaseService',
        function(groupDatabaseService){
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
                
                addGroup: function(groupId, courseId){
                   return db.ref(coursePath + courseId + '/' + groupPath + groupId).set(groupId)
                },

                getGroups: function(courseId) {
                    var courseInfoRef = db.ref(coursePath+courseId);
                    return courseInfoRef.once('value').then(function(snapshot){
                        var groups = [];
                        var groupsDict =  snapshot.val().groups;
                        for (var key in groupsDict){
                            var g = groupDatabaseService.getGroup(groupsDict[key]);
                            groups.push(g);
                        }
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
