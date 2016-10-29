angular.module('app.userDatabaseService', ['ionic', 'app.courseDatabaseService'])
    .service('userCourseGroupService', ['courseDatabaseService',
        function(courseDatabaseService){
            var rootPath = "Users/";
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

    .service('profileService', [function(){
        return{
            /*
                This function takes two strings, a name and an email,
                and creates a database entry using the user's uid as a key
                that stores the user's profile information.
            */
            createProfile: function(user){
                var db = firebase.database();
                var path = "Users/" + user.uid;

                var profile = {
                    Name: user.displayName,
                    Email: user.email
                };
                db.ref(path).set(profile);

                console.log("ProfileService: profile created");
            },

            /*
                This function takes four arguments, name, email, phone, and
                description and updates the current user's profile entry in
                firebase's realtime database.
            */
            updateProfile: function(name, email, phone, description){
                var user = firebase.auth().currentUser;
                var db = firebase.database();
                var path = "Users/" + user.uid;

                var updates = {};
                if(name)
                    updates["Name"] = name;
                if(email)
                    updates["Email"] = email;
                if(phone)
                    updates["Phone"] = phone;
                if(description)
                    updates["Description"] = description;

                db.ref(path).update(updates);

                console.log("ProfileService: profile updated");
            },

            onProfileChanged: function(callback){
                var ref = firebase.database().ref("Users/" + firebase.auth().currentUser.uid);
                ref.on("value", function(snapshot){callback(snapshot)});
            },

        }
    }])
;

