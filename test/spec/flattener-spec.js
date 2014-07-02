/*global define:true, describe:true , it:true , expect:true,
beforeEach:true, sinon:true, spyOn:true , expect:true */
/* jshint strict: false */
define(['flattener'], function(Flattener) {

    describe('just checking', function() {

        it('Flattener should be loaded', function() {
            expect(Flattener).toBeTruthy();
            var flattener = new Flattener();
            expect(flattener).toBeTruthy();
        });

        it('Flattener should initialize', function() {
            var flattener = new Flattener();
            var output = flattener.init();
            var expected = 'This is just a stub!';
            expect(output).toEqual(expected);
        });

    });

});