angular.module('app.userDatabaseService', ['ionic', 'app.courseDatabaseService'])
    .service('userCourseGroupService', ['courseDatabaseService', 'profileService', 'groupDatabaseService',
        function(courseDatabaseService, profileService, groupDatabaseService){
            var usersPath = 'users/';
            var coursesPath = 'courses/';
            var groupsPath = 'groups/';
            var db = firebase.database();
            var userId = firebase.auth().currentUser.uid;
            return {
                getUserCourses: function(){
                    var path = usersPath + userId + '/' + coursesPath;

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
                    var path = usersPath + userId + '/' + coursesPath;
                    var coursesRef = db.ref(path);
                    return coursesRef.push(courseId);
                },
                
                addGroupMember: function(groupId){
                    var member = {};
                    member[userId] = profileService.getName();
                    
                    return db.ref(groupsPath + groupId + '/members/').set(member)
                        .then(function(){
                            return db.ref(usersPath + userId + '/' + groupsPath + groupId).set(groupId)
                    });
                    
                },

                getUserGroups: function() {
                    var path = usersPath + userId + '/' + groupsPath;
                    var groupsRef = db.ref(path);
                    return groupsRef.once('value').then(function(snapshot){
                        var groups = [];
                        snapshot.forEach(function(childSnapshot){
                            var group =
                                groupDatabaseService
                                .getGroup(childSnapshot.val());
                            group.key = childSnapshot.kdy
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


            getProfile: function(uid){
                if(!uid) uid = firebase.auth().currentUser.uid;
                profileRef = db.ref(usersPath + uid);
                return profileRef.once('value').then(function(snapshot){
                    return snapshot.val();
                })
            },

            getName: function(uid){
                return db.ref(usersPath + uid + '/name').once('value').then(function(snapshot){
                    return snapshot.val();
                });
            }

        }
    }])
;

