angular.module('app.services', ['app.newClassPopupService'])

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
                        console.log("LoginService: onLoginStatusChanged => Signed in");
                    } else {
                        console.log("LoginService: onLoginStatusChanged => Not signed in");
                    }
                    callback(user);
                });
            },
            onSignout: function(callback){
                signOutCallback = callback;
            },
            login: function(email, password){
                var auth = firebase.auth();
                console.log("LoginService: Login user: " + email +
                    " password: " + password);

                return auth.signInWithEmailAndPassword(email, password);
            },
            signup: function(email, password){
                console.log("LoginService: Sign up user: " + email +
                    " password: " + password);
                return firebase.auth().createUserWithEmailAndPassword(email, password);
            },
            signout: function(){
                var user = firebase.auth().currentUser;
                if (user) {
                    console.log("LoginService: Sign out user: " + user);
                    firebase.auth().signOut().then(
                        function(){
                            if (signOutCallback) {
                                signOutCallback();
                            }
                        }
                    )
                }
            },
            sendVerification: function(){
                var user = firebase.auth().currentUser;
                if (user) {
                    user.sendEmailVerification();
                }
            }
        }
    }])

;
