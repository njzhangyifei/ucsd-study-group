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
    }
    ])

    .service('profileService', [function(){
        return{
            /*
                This function takes two strings, a name and an email, 
                and creates a database entry using the user's uid as a key
                that stores the user's profile information.
            */
            createProfile: function(user){
                var db = firebase.database();
                var path = "Users/" + user.uid;
                
                var profile = {
                    Name: user.displayName,
                    Email: user.email
                };
                db.ref(path).set(profile);
                
                console.log("ProfileService: profile created");
            },
            
            /*
                This function takes four arguments, name, email, phone, and
                description and updates the current user's profile entry in 
                firebase's realtime database. 
            */
            updateProfile: function(name, email, phone, description){
                var user = firebase.auth().currentUser;
                var db = firebase.database();
                var path = "Users/" + user.uid;
                
                var updates = {};
                if(name)
                    updates["Name"] = name;
                if(email)
                    updates["Email"] = email;
                if(phone)
                    updates["Phone"] = phone;
                if(description)
                    updates["Description"] = description;
                
                db.ref(path).update(updates);
                
                console.log("ProfileService: profile updated");
            },
            
            updateClasses: function(classes){
                
            },
            onProfileChanged: function(callback){
                var ref = firebase.database().ref("Users/" + firebase.auth().currentUser.uid);
                ref.on("value", function(snapshot){callback(snapshot)});
            },
            
        }

    }])

    .service('groupService', [function(){
        
        return{
            createGroup: function(){
                var db = firebase.database();
                var newGroupRef = db.ref("Groups").push();
                var uid = firebase.auth().currentUser.uid;
                
                // TODO write group to database
                //
            },
            
            //TODO implement this
            joinGroup: function(uid, gid){
                // TODO update database fields to add user to group
            },
            
            //TODO implement this
            onGroupInfoChanged: function(){
                //view profile
            }
        }

    }])

;
