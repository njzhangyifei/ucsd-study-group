angular.module('app.groupDatabaseService', ['ionic'])
    .service('groupDatabaseService', [ 'profileService',
        function($ionicPopup, $rootScope){
            var db = firebase.database();
            var groupsPath = 'groups/';
            return {
                createGroup: function(group, cid){\
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

                addMember: function(){
                    
                },
                
                removeMember: function(){
                    
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
