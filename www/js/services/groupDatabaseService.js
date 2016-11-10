angular.module('app.groupDatabaseService', ['ionic'])
    .service('groupDatabaseService', [
        function(){
            var db = firebase.database();
            var groupsPath = 'groups/';
            var membersPath = 'members/';
            var usersPath = 'users/'

            return {
                createGroup: function(group){
                    // still needs work
                    var currentUser = firebase.auth().currentUser.uid;
                    group.creator = currentUser
                    var groupInfoRef = db.ref(groupsPath).push(group);
                    return groupInfoRef;
                },

                getGroup: function(groupId){
                    var groupInfoRef = db.ref(groupsPath + groupId);
                    return groupInfoRef.once('value').then(function(snapshot){
                        var group = snapshot.val();
                        group.key = groupId;
                        return group;
                    });
                },
            }
        }])
;
