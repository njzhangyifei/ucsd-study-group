angular.module('app.groupDatabaseService', ['ionic'])
    .service('groupDatabaseService', ['profileService',
        function(profileService){
            var db = firebase.database();
            var groupsPath = 'groups/';
            var membersPath = 'members/';
            var usersPath = 'users/';
            var meetingPath = '/meeting/'
            var messagePath = '/messages'

            return {
                createGroup: function(group){
                    // still needs work
                    group.creator = userDatabaseService.getCurrentUserId()
                    var groupInfoRef = db.ref(groupsPath).push(group);
                    return groupInfoRef;
                },

                getGroup: function(groupId){
                    var groupInfoRef = db.ref(groupsPath + groupId);
                    return groupInfoRef.once('value').then(function(snapshot){
                        var group = snapshot.val();
                        group.id = groupId;
                        return group;
                    });
                },

                updateGroup: function(group){

                    var groupInfoRef = db.ref(groupsPath + group.id);
                    var g = Object.assign({}, group);
                    delete g.id;
                    delete g.member;
                    return groupInfoRef.update(g);
                },

                getMeeting: function(group){
                        var path = groupsPath + group.id + meetingPath;
                        var meetingInfoRef = db.ref(path);
                        if(meetingInfoRef == null)
                        {
                            var meeting = {};
                            meeting['title'] = '';
                            meeting['description'] = '';
                            meeting['location'] = '';
                            meeting['time'] = '';
                            db.ref(path).update(meeting);
                            return meeting;
                        }
                        else
                        {    
                            return meetingInfoRef.once('value').then(function(snapshot){
                            return snapshot.val();
                            });
                        }
                },

                updateMeeting: function(group, title, description, location, time){

                    var path = groupsPath + group.id + meetingPath;
                    var meetingInfoRef = db.ref(path);
                    var meeting = {};
                    if(title)
                        meeting['title'] = title;
                    if(description)
                        meeting['description'] = description;
                    if(location)
                        meeting['location'] = location;
                    if(time)
                        meeting['time'] = time;

                    db.ref(path).update(meeting);
                    console.log('Meeting has updated.');
                },
                
                writePost: function(groupId, content){
                    var messageRef = db.ref(groupsPath + groupId + 
                                            messagePath + '/' + Date.now());
                    var message = {
                        user: profileService.getCurrentUserId(),
                        content: content
                    };
                    console.log('writing: ' + message + ' ' + content);
                    return messageRef.set(message);
                },
                
                getPosts: function(groupId){
                    var messageQuery = db.ref(groupsPath + groupId + messagePath).orderByKey();
                    return messageQuery.once('value').then(function(snapshot){
                        var messages = [];
                        console.log(snapshot.val());
                        snapshot.forEach(function(childSnapshot){
                            var message = childSnapshot.val();
                            message.date = childSnapshot.key;
                            profileService.getName(message.user).then(function(name){
                                message.user = name;
                            })
                            console.log(message.user);
                            messages.unshift(message);
                        });
                        return messages;
                    }).catch(function(err){
                        console.log(err)
                    })
                }
            }
        }])
;
