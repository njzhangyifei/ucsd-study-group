angular.module('app.meetingController', ['ionic', 'jett.ionic.filter.bar',
	'app.userDatabaseService',
	'app.groupDatabaseService'
	])

.controller('groupMeetingCtrl', 
	['$scope', '$stateParams', '$state', '$ionicHistory', '$ionicPopup',
	'$ionicLoading','profileService', 'userCourseGroupService', 'groupDatabaseService', 
	function($scope, $stateParams, $state, $ionicHistory, $ionicPopup, $ionicLoading, 
		profileService, userCourseGroupService, groupDatabaseService){
        $scope.meeting = {};
		var group = $stateParams.group;
        console.log(group);
        $scope.isEditable = group.creator == profileService.getCurrentUserId();
        console.log("isEditable = " + $scope.isEditable);

        function retrieveMeeting () {
            $ionicLoading.show({
                template: 'Loading',
                delay: 50
            });
            groupDatabaseService.getMeeting($stateParams.group)
                .then(function(res){
                    $scope.meeting = res;
                    console.log(res);
                    $ionicLoading.hide();
                }).catch(function(error){
                    console.log("error !" + error);
                    $ionicLoading.hide();
                });
        }

        retrieveMeeting();
        
		$scope.editMeeting = function()
        {
			$scope.editing = true;
		};

		$scope.updateMeeting = function()
        {
            // TODO update the meeting entry
            var title = $scope.meeting.title;
            var time = $scope.meeting.time;
            var description = $scope.meeting.description;
            var location = $scope.meeting.location;

            console.log("button update meeting clicked");

            groupDatabaseService.updateMeeting($stateParams.group, title, description, location, time);
            $scope.editing = false;
            retrieveMeeting();
        };

	}])

