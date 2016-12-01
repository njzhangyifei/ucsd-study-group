describe('stateParamsService', function() {

    var StateParamsService;

    beforeEach( function() {
        module('app');
        module('ionic');
        module('app.stateParamsService');

        inject( function(stateParamsService) {
            StateParamsService = stateParamsService;
        } )
    } );

    describe('#setStateParams', function(){
        it('should save the state', function() {
            StateParamsService.setStateParams('test', {a:100});
            var t = StateParamsService.getStateParams('test');
            chai.assert(t.a == 100);
        })

    });

    afterEach(function() {
        // runs after each test in this block
    });
})
