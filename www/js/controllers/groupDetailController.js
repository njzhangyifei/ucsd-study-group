angular.module('app.groupDetailController',
    ['ionic', 'app.groupDatabaseService',])
    
    .controller('groupDetailCtrl',
        ['$scope', '$stateParams', '$state',
        '$ionicLoading','groupDatabaseService',
        function($scope, $stateParams, $state, $ionicLoading, 
            groupDatabaseService){
            var group = $stateParams.group;
            $scope.group = group;
            
            $scope.join = function(){
                //TODO
            }
            
            function loadGroupInfo(){
                $ionicLoading.show({
                    template: 'Loading',
                    delay: 50
                })
                groupDatabaseService.getGroup()
                    .then(function(res){
                        $scope.group = res;
                        $scope.items = [];
                        //TODO get members
                        /*
                        res.members.forEach(function(t){
                            $scope.members.push({
                                name: t.name,
                                description: t.description
                            })
                        })
                        */
                        $ionicLoading.hide();
                    }).catch(function(error){
                        console.log("error !" + error);
                        $ionicLoading.hide();
                    });
            }

        }])
        