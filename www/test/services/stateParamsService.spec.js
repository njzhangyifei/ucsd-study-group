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

    describe('#getsetStateParams', function(){
        it('should save the state', function() {
            StateParamsService.setStateParams('test', {a:100});
            StateParamsService.setStateParams('test200', {a:200});
            var t = StateParamsService.getStateParams('test');
            var t2 = StateParamsService.getStateParams('test200');
            chai.assert(t.a == 100);
            chai.assert(t2.a == 200);
        })
    });

    describe('#stateParamsPersistence', function() {
        it('should be able to get the state', function() {
            var t = StateParamsService.getStateParams('test');
            var t2 = StateParamsService.getStateParams('test200');
            chai.assert(t.a == 100);
            chai.assert(t2.a == 200);
        })
    });


    afterEach(function() {
        // runs after each test in this block
    });
})
