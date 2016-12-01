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
        it('should create a new group', 
            function() {
            var new_g = {
                name:'grouptest',
                description:'test2',
            }
            var creator_id = 123;
            return GroupDatabaseService.createGroup(new_g, creator_id);
        })
    });
    
     describe('#updateGroup', function(){
        it('should able to update the group info except members and group id', function() 
        {

            var g = {
                id:233,
                name:'updated',
                description:'changed',
            }
            return GroupDatabaseService.updateGroup(g);
        })
    });

    describe('#getGroup',function(){
        it('should be able to get the correct group',
        function() {
            var gid = 233;
            var name = 'updated';
            var description = 'changed';
            return GroupDatabaseService.getGroup(gid).then(function(newGroup)
            {
                chai.expect(newGroup.id).to.equal(gid);
                chai.expect(newGroup.name).to.equal(name);
                chai.expect(newGroup.description).to.equal(description);
            })    
        })
    });
 
    describe('#updateMeeting', function(){
        it('should able to update a meeting', function() 
        {
             var g = {
                id:233,
                name:'updated',
                description:'changed',
            }
            var title = 'title';
            var time = 'time';
            var description = 'description';
            var location = 'location';
        })
    });   

     describe('#getMeeting', function(){
        it('should able to get the meeting', function() 
        {
             var g = {
                id:233,
                name:'updated',
                description:'changed',
            }
            var title = 'title';
            var time = 'time';
            var description = 'description';
            var location = 'location';
            return GroupDatabaseService.getMeeting(g).then(function(meeting)
            {
                chai.expect(meeting.title).to.equal(title);
                chai.expect(meeting.time).to.equal(time);
                chai.expect(meeting.description).to.equal(description);
                chai.expect(meeting.location).to.equal(location);
            })
        })
    });  
    afterEach(function() {
        // runs after each test in this block
    });
})
