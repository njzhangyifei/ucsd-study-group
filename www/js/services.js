angular.module('app.services', ['firebase'])

    .factory('BlankFactory', [function(){

    }])

    .service('BlankService', [function(){

    }])

    .service('loginService', ['$firebaseAuth', 
        function($firebaseAuth){ 
            return {
                login: function(email, password){
                    var auth = $firebaseAuth();
                    console.log("Login user: " + email + 
                        " password: " + password);

                    return auth.$signInWithEmailAndPassword(email, password);
                }
            }
        }
    ]);
