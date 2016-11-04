angular.module('app.groupDatabaseService', ['ionic'])
    .service('groupDatabaseService', [ 'profileService',
        function($ionicPopup, $rootScope){
            var db = firebase.database();
            var groupsPath = 'groups/';
            var membersPath = 'members/';

            return {
                createGroup: function(group){
                    // still needs work
                    group.creator = firebase.auth().currentUser.uid;
                    var groupInfoRef = db.ref(groupsPath).push(group);
                    return groupInfoRef;
                },

                getGroup: function(groupId){
                    var groupInfoRef = db.ref(groupsPath + groupId);
                    return groupInfoRef.once('value').then(function(snapshot){
                        return snapshot.val();
                    });
                },

                addMember: function(groupId, uid){
                    var member = {};
                    member[uid] = profileService.getName();
                    return db.ref(groupsPath + groupId+ '/' + memberPath).set(member);
                },

                removeMember: function(groupId, uid){
                    return db.ref(groupsPath + groupId + '/' + memberPath).child(uid).remove();
                }
            }
        }])
;
