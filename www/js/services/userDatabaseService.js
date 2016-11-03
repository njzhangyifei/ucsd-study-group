angular.module('app.userDatabaseService', ['ionic', 'app.courseDatabaseService'])
    .service('userCourseGroupService', ['courseDatabaseService',
        function(courseDatabaseService){
            var usersPath = 'users/';
            var coursesPath = 'courses/';
            var groupsPath = 'groups/';
            var db = firebase.database();
            return {
                
                getUserCourses: function(){
                    var uid = firebase.auth().currentUser.uid;
                    var path = usersPath + uid + "/" + coursesPath;

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
                    var uid = firebase.auth().currentUser.uid;
                    var path = usersPath + uid + "/" + coursesPath;
                    var coursesRef = db.ref(path);
                    return coursesRef.push(courseId);
                },
                                        
                getUserGroups: function() {
                    var uid = firebase.auth().currentUser.uid;
                    var path = usersPath + uid + "/" + groupsPath;
                    var groupsRef = db.ref(path);
                    return groupsRef.once('value').then(function(snapshot){
                        var groups = [];
                        snapshot.forEach(function(childSnapshot){
                            var group = 
                                groupDatabaseService
                                .getGroup(childSnapshot.val());
                            groups.push(group);
                        })
                        return Promise.all(groups);
                    });
            	}
            }
        }])

    .service('profileService', [function(){
        var db = firebase.database();
        var usersPath = 'users/'
        return{
            /*
                This function takes two strings, a name and an email,
                and creates a database entry using the user's uid as a key
                that stores the user's profile information.
            */
            createProfile: function(user){
                var path = usersPath + user.uid;

                var profile = {
                    name: user.displayName,
                    email: user.email
                };
                db.ref(path).set(profile);

                console.log('ProfileService: profile created');
            },

            /*
                This function takes four arguments, name, email, phone, and
                description and updates the current user's profile entry in
                firebase's realtime database.
            */
            updateProfile: function(name, email, phone, description){
                var user = firebase.auth().currentUser;
                var path = usersPath + user.uid;

                var updates = {};
                if(name)
                    updates['name'] = name;
                if(email)
                    updates['email'] = email;
                if(phone)
                    updates['phone'] = phone;
                if(description)
                    updates['description'] = description;

                db.ref(path).update(updates);

                console.log('ProfileService: profile updated');
            },

            onProfileChanged: function(callback){
                var profileRef = db.ref(usersPath + firebase.auth().currentUser.uid);
                profileRef.on('value', function(snapshot){callback(snapshot)});
            },
            
            getName: function(uid){
                return db.ref(usersPath + uid + '/name').once('value').then(function(snapshot){
                    return snapshot.val();
                });
            }

        }
    }])
;

