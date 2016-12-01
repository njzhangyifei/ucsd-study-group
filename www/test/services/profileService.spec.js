describe('profileService', function() {
    var ProfileService;

    beforeEach( function() {
        module('app');
        module('ionic');
        module('app.courseDatabaseService');
        module('app.userDatabaseService');

        inject(function(profileService) {
            ProfileService = profileService;
        })
    } );

    describe('#createProfile', function() {
        it('should be able to create user profile without error', 
            function() {
                var user = {
                    uid: 'testuid',
                    displayName: 'testuser',
                    email: 'test@ucsd.edu',
                }
                return ProfileService.createProfile(user)
            })
    });

    describe('#getProfile', function() {
        it('should be able to get correct user profile without error', 
            function() {
                var uid = 'testuid';
                return ProfileService.getProfile(uid).then(function(profile) {
                    chai.expect(profile.id).to.equal(uid);
                    chai.expect(profile.name).to.equal('testuser');
                    chai.expect(profile.email).to.equal('test@ucsd.edu');
                })
            })
    });

    describe('#getName', function () {
        it('should be able to get correct user name',
            function() {
                var uid = 'testuid';
                return ProfileService.getName(uid).then(function(name) {
                    chai.expect(name).to.equal('testuser');
                })
            }
        )
    })

    afterEach(function() {
        // runs after each test in this block
    });
})
