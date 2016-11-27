angular.module('app.groupDatabaseService', ['ionic'])
    .service('groupDatabaseService', [
        function(){
            var db = firebase.database();
            var groupsPath = 'groups/';
            var membersPath = 'members/';
            var usersPath = 'users/';
            var meetingPath = '/meeting/'
            

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
                    return meetingInfoRef.once('value').then(function(snapshot){
                    return snapshot.val();
                    })
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
            }
        }])
;
