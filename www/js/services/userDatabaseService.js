angular.module('app.userDatabaseService', ['ionic', 'app.courseDatabaseService'])
    .service('userCourseGroupService', ['courseDatabaseService', 'profileService', 'groupDatabaseService',
        function(courseDatabaseService, profileService, groupDatabaseService){
            var usersPath = 'users/';
            var coursesPath = 'courses/';
            var groupsPath = 'groups/';
            var membersPath = 'members/';
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
                    return db.ref(groupsPath + groupId + '/' + membersPath + userId).set(userId).then(function(){
                        return db.ref(usersPath + userId + '/' + groupsPath + groupId).set(groupId)
                    });
                },
                
                removeGroupMember: function(groupId){
                    return db.ref(groupsPath + groupId + '/' + membersPath + userId).remove().then(function(){
                        return db.ref(usersPath + userId + '/' + groupsPath + groupId).remove()
                    })
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
                            group.id = childSnapshot.key
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
        //var defaultAvatarURL = 'https://firebasestorage.googleapis.com/v0/b/ucsd-study-group.appspot.com/o/avatars%2Fdefault.jpg?alt=media&token=a6f6bb05-ee60-4f83-b06e-60e626ca4065'
        
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
                    email: user.email,
                    avatar: null,
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

                console.log('Profile is updated');
            },

            getCurrentUserId:function(){
                return firebase.auth().currentUser.uid;
            },


            getProfile: function(uid){
                if(!uid) uid = firebase.auth().currentUser.uid;
                profileRef = db.ref(usersPath + uid);
                return profileRef.once('value').then(function(snapshot){
                    var member = snapshot.val();
                    member.id = uid;
                    return member;
                })
            },

            getName: function(uid){
                return db.ref(usersPath + uid + '/name').once('value').then(function(snapshot){
                    return snapshot.val();
                });
            },

            getDefaultAvatar: function(){
                //base64
            },

            getAvatar: function(uid){
                var user = firebase.auth().currentUser;
                var path = usersPath + uid + "/avatar";
                return db.ref(path).once('value').then(function(snapshot){
                    return snapshot.val();
                });
            },
            
            setAvatar: function(uri){
                var user = firebase.auth().currentUser;
                var path = usersPath + user.uid + "/avatar";
                var base64_promise = new Promise(function(resolve, reject){
                    window.plugins.Base64.encodeFile(uri, resolve, reject);
                });
                return base64_promise.then(function(res){
                    return db.ref(path).set(res);
                })

                // var storageRef = firebase.storage().refFromURL('gs://ucsd-study-group.appspot.com')
                    // .child('avatars/' + user.uid);
                
                // return fetch(uri)
                    // .then(function(data){
                        // return data.blob();
                        // console.log(blob);
                    // }).then(function(blob){
                        // var metadata = {
                            // contentType: 'image'
                        // };
                        
                        // storageRef.put(blob, metadata)
                            // .then(function(snapshot){
                                // db.ref(path + '/picture').set(snapshot.downloadURL);
                            // }).catch(function(error){
                                // console.log(error);
                            // })
                    // }).catch(function(error){
                        // console.log(error);
                    // });    
            }          
        }
    }])
;

