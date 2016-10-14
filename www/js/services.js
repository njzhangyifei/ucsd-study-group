angular.module('app.services', [])

    .factory('BlankFactory', [function(){

    }])

    .service('BlankService', [function(){

    }])

    .service('loginService', [function(){
        var signOutCallback;
        return {
            onLoginStatusChanged: function(callback){
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        console.log("onLoginStatusChanged => Signed in");
                    } else {
                        console.log("onLoginStatusChanged => Not signed in");
                    }
                    callback(user);
                });
            },
            onSignout: function(callback){
                signOutCallback = callback;
            },
            login: function(email, password){
                var auth = firebase.auth();
                console.log("Login user: " + email +
                    " password: " + password);

                return auth.signInWithEmailAndPassword(email, password);
            },
            signout: function(){
                var user = firebase.auth().currentUser;
                if (user) {
                    console.log("signing out user: " + user);
                    firebase.auth().signOut().then(
                        function(){ 
                            if (signOutCallback) {
                                signOutCallback();
                            }
                        }
                    )
                }
            }
        }
    }
    ])

;
