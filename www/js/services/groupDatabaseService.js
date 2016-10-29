angular.module('app.groupDatabaseService', ['ionic'])
    .service('groupDatabaseService', [
        function($ionicPopup, $rootScope){
            var groupsPath = "Groups/";
            return {
                createGroup: function(){
                    
                },

                getGroup: function(groupId){
                    
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
