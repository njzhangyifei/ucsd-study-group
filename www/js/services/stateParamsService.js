// THIS SERVICE IS A REPLACEMENT FOR THE $stateParams
// stateParams are saved oin the localStorage

// module injection
angular.module('app.stateParamsService', ['ionic'])
    // dependency injection
    .service('stateParamsService', [ '$ionicHistory',
        function($ionicHistory){
            return {
                // get the state param based on current view or a given state
                getStateParams: function(stateName){
                    // check if there is such argument
                    if (!stateName) {
                        stateName = $ionicHistory.currentStateName()
                    }
                    // get the json string
                    var stateParams = JSON.parse(localStorage.getItem(stateName));
                    // console.log("stateParams read: " + stateName);
                    return stateParams;
                },

                // set the state param for a given state
                setStateParams: function(stateName, stateParams){
                    // set the state param for the given state
                    localStorage.setItem(stateName, JSON.stringify(stateParams));
                    // console.log("stateParams written: " + stateName);
                }
            }
        }])
;
