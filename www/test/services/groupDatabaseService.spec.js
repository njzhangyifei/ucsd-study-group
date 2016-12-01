describe('groupDataService', function() {

    var GroupDataService;

    beforeEach( function() {
        module('app');
        module('ionic');
        module('app.groupDatabaseService');

        inject( function(groupDatabaseService) {
            GroupDatabaseService = groupDatabaseService;
        } )
    } );

    describe('#create&getGroup', function(){
        it('should create a new group with info input and get that group', function() {
            var new_g = {
                name:'grouptest',
                description:'test2'
            };
            var creator_id = 123;
            GroupDatabaseService.createGroup(new_g, creator_id).then(function(new_g_ref)
            {
                GroupDatabaseService.getGroup(new_g_ref.id).then(function(newGroup)
                {
                    chai.assert(newGroup.name == 'grouptest');
                    chai.assert(newGroup.description == 'test2');
                    chai.assert(newGroup.creator == 123);
                });
            });    
        });
    });
    
     describe('#updateGroup', function(){
        it('should update the group info except members and group id', function() 
        {
            var new_g = {
                name:'updatetest',
                description:'changeit'
            };
    
            var creator_id = 123;
            GroupDatabaseService.createGroup(new_g, creator_id).then(function(new_g_ref)
            {
                new_g_ref.name = 'namechanged';
                new_g_ref.description = 'changed'
                GroupDatabaseService.updateGroup(new_g_ref).then(function(changedGroup)
                {
                    GroupDatabaseService.getGroup(changedGroup).then(function(updatedGroup)
                    {
                        chai.assert(updatedGroup.name == 'namechanged');
                        chai.assert(updatedGroup.name == 'changed');
                    });
                });    
            });
        });
    });

    describe('update&getMeeting', function(){
        it('should update the meeting and get updated meeting information back', function()
        {
            var new_g = {
                name:'Meetingtest',
                description:'test2'
            };
            var creator_id = 123;
            GroupDatabaseService.createGroup(new_g, creator_id).then(function(new_g_ref)
            {
                var title = 'update meeting';
                var time = 'update time';
                var description = 'update description';
                var location = 'update location';
                GroupDatabaseService.updateMeeting(new_g_ref, title, time, description, location).then(function()
                {
                    GroupDatabaseService.getMeeting(new_g_ref).then(function(meeting)
                    {
                        chai.assert(meeting.title == 'update meeting');
                        chai.assert(meeting.time == 'update time');
                        chai.assert(meeting.description == 'update description');
                        chai.assert(meeting.location == 'update location');
                    });
                });
            });
        });
    });

    describe('write&getpost', function(){
        it('should write the post in the group disscussion and get it', function()
        {
            var new_g = {
                name:'posttest',
                description:'test2'
            };
            var creator_id = 123;
            GroupDatabaseService.createGroup(new_g, creator_id).then(function(new_g_ref)
            {
                var content = 'something new!';

                GroupDatabaseService.writePost(new_g_ref, content).then(function(message)
                {
                    GroupDatabaseService.getPost(new_g.id).then(function(messages)
                    {
                        except(messages).to.not.be.null;
                    });
                });
            });
        });
    });
    afterEach(function() {
        // runs after each test in this block
    });
})
