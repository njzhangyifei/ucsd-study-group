angular.module('app.groupDatabaseService', ['ionic'])
    .service('groupDatabaseService', [
        function(){
            var db = firebase.database();
            var groupsPath = 'groups/';
            var membersPath = 'members/';
            var usersPath = 'users/';
            var messagePath = 'messages/'

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
                
                writeMessage: function(groupId, content){
                    var messageRef = db.ref(groupsPath + groupId + '/' + 
                                            messagePath + new Date().now());
                    var message = {
                        user: userDatabaseService.getCurrentUserId(),
                        content: content
                    };
                },
                
                getMessages: function(groupId, lim){
                    var messageQuery = db.ref(groupsPath + groupId + '/' + messagePath).limitToLast(lim);
                    return messageQuery.once('value').then(function(snapshot){
                       return snapshot.val(); 
                    });
                }
            }
        }])
;
