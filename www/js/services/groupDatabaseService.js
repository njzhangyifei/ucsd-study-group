angular.module('app.groupDatabaseService', ['ionic'])
    .service('groupDatabaseService', ['profileService',
        function(profileService){
            var db = firebase.database();
            var groupsPath = 'groups/';
            var membersPath = 'members/';
            var usersPath = 'users/';
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
                
                writePost: function(groupId, content){
                    var messageRef = db.ref(groupsPath + groupId + 
                                            messagePath + '/' + Date.now());
                    var message = {
                        user: profileService.getCurrentUserId(),
                        content: content
                    };
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
                            messages.push(message);
                            console.log('getPosts, pushing: '+ message);
                        });
                        return messages;
                    }).catch(function(err){
                        console.log(err)
                    })
                }
            }
        }])
;
