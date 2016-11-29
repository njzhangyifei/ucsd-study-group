// module injection
angular.module('app.groupDatabaseService', ['ionic'])
    // dependency injection
    .service('groupDatabaseService', ['profileService',
        function(profileService){
            // keep a reference to the firebase.database()
            var db = firebase.database();
            var groupsPath = 'groups/';
            var membersPath = 'members/';
            var usersPath = 'users/';
            var meetingPath = '/meeting/'
            var messagePath = '/messages'

            return {
                // create group with a creator
                createGroup: function(group, creator){
                    // still needs work
                    group.creator = creator;
                    // push the group onto the database
                    var groupInfoRef = db.ref(groupsPath).push(group);
                    return groupInfoRef;
                },

                // get the group info
                getGroup: function(groupId){
                    var groupInfoRef = db.ref(groupsPath + groupId);
                    return groupInfoRef.once('value').then(function(snapshot){
                        // resolve the group info value
                        var group = snapshot.val();
                        group.id = groupId;
                        return group;
                    });
                },

                // update group info based on the object
                updateGroup: function(group){
                    var groupInfoRef = db.ref(groupsPath + group.id);
                    var g = Object.assign({}, group);
                    // we don't want to update the group id and member info here
                    delete g.id;
                    delete g.member;
                    return groupInfoRef.update(g);
                },

                // get the meeting info for this group
                getMeeting: function(group){
                    // set up meeting info ref
                    var path = groupsPath + group.id + meetingPath;
                    var meetingInfoRef = db.ref(path);
                    if(meetingInfoRef == null)
                    {
                        var meeting = {};
                        meeting['title'] = '';
                        meeting['description'] = '';
                        meeting['location'] = '';
                        meeting['time'] = '';
                        // create the meeting
                        db.ref(path).update(meeting);
                        return meeting;
                    }
                    else
                    {
                        // retrive the meeting info
                        return meetingInfoRef.once('value').then(function(snapshot){
                            return snapshot.val();
                        });
                    }
                },

                // update meeting info field
                updateMeeting: function(group, title, description, location, time){
                    // setup
                    var path = groupsPath + group.id + meetingPath;
                    var meetingInfoRef = db.ref(path);
                    var meeting = {};
                    // check for the required update field
                    if(title)
                        meeting['title'] = title;
                    if(description)
                        meeting['description'] = description;
                    if(location)
                        meeting['location'] = location;
                    if(time)
                        meeting['time'] = time;
                    // update the meeting
                    db.ref(path).update(meeting);
                    console.log('Meeting has updated.');
                },

                // create a post in the group
                writePost: function(groupId, content){
                    // setup message reference
                    var messageRef = db.ref(groupsPath + groupId +
                                            messagePath + '/' + Date.now());
                    // create the message based on user id and content
                    var message = {
                        user: profileService.getCurrentUserId(),
                        content: content
                    };
                    console.log('writing: ' + message + ' ' + content);
                    // put the message on the database
                    return messageRef.set(message);
                },

                // get the posts in the group id
                getPosts: function(groupId){
                    // setup
                    var messageQuery = db.ref(groupsPath + groupId + messagePath).orderByKey();
                    return messageQuery.once('value').then(function(snapshot){
                        // get each message async
                        var messages = [];
                        snapshot.forEach(function(childSnapshot){
                            var message = childSnapshot.val();
                            message.date = childSnapshot.key;
                            profileService.getName(message.user).then(function(name){
                                message.user = name;
                            })
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
