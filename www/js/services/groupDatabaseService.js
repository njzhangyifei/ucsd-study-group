angular.module('app.groupDatabaseService', ['ionic'])
    .service('groupDatabaseService', [ 'profileService',
        function($ionicPopup, $rootScope, userCourseGroupService){
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
                        return snapshot.val();
                    });
                },
                
                
                removeMember: function(groupId, userId){
                    return db.ref(groupsPath + groupId + '/' + memberPath).child(userId).remove();
                }
            }
        }])
;
