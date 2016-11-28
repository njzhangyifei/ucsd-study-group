angular.module('app.stateParamsService', ['ionic'])
    .service('stateParamsService', [ '$ionicHistory',
        function($ionicHistory){
            return {
                getStateParams: function(stateName){
                    if (!stateName) { 
                        stateName = $ionicHistory.currentStateName()
                    }
                    var stateParams = JSON.parse(localStorage.getItem(stateName));
                    console.log("stateParams read: " + stateName);
                    return stateParams;
                },

                setStateParams: function(stateName, stateParams){
                    // var stateName = $ionicHistory.currentStateName()
                    localStorage.setItem(stateName, JSON.stringify(stateParams));
                    console.log("stateParams written: " + stateName);
                }
            }
        }])
;
