angular.module('app.groupDatabaseService', ['ionic'])
    .service('groupDatabaseService', [ 'profileService',
        function($ionicPopup, $rootScope){
            var db = firebase.database();
            var groupsPath = 'groups/';
            var membersPath = 'members/';
            
            return {
                createGroup: function(group){
                    var groupInfoRef = db.ref(groupsPath).push(group);
                    return groupInfoRef.then(function(){
                        return addMember(groupInfoRef, group.creator);
                    });
                },

                getGroup: function(groupId){
                    var groupInfoRef = db.ref(groupsPath + groupId);
                    return groupInfoRef.once('value').then(function(snapshot){
                        var groupInfo = snapshot.val();
                        groupInfo.key = groupId
                        return groupInfo;
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


                // onAvailableCoursesChanged: function(func){
                    // var db = firebase.database();
                    // var availCourseRef = db.ref(availableCoursesPath);
                    // availCourseRef.on('child_added', function(snapshot){
                        // func(snapshot);
                    // });
                // },
            }
        }])
;
