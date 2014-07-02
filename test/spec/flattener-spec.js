/*global define:true, describe:true , it:true , expect:true,
beforeEach:true, sinon:true, spyOn:true , expect:true */
/* jshint strict: false */
define(['flattener'], function(Flattener) {

    describe('just checking', function() {

        it('Flattener should be loaded', function() {
            expect(Flattener).toBeTruthy();
        });

        it('Flattener should have a VERSION', function() {
            expect(Flattener.VERSION).toBeTruthy();
        });

        it('should flatten objects', function() {
            var src = {
                prop1: {
                    inside1: {
                        value1: 'value1'
                    },
                    array1: ['arr1', 'arr2']
                },
                prop2: {
                    inside2: {
                        value2: 'value2'
                    }
                }
            };

            var out = Flattener.flatten(src);
            var expected = Flattener.unflatten(out);
            expect(src).toMatchObject(expected);
        });

        it('should unflatten objects', function() {
            var src = {
                'prop1.inside1.value1': 'value1',
                'prop1.array1.0': 'arr1',
                'prop1.array1.1': 'arr2',
                'prop2.inside2.value2': 'value2'
            };
            var expected = {
                prop1: {
                    inside1: {
                        value1: 'value1'
                    },
                    array1: ['arr1', 'arr2']
                },
                prop2: {
                    inside2: {
                        value2: 'value2'
                    }
                }
            };

            var out = Flattener.unflatten(src);
            window.expected = expected;
            window.out = out;
            expect(out).toMatchObject(expected);
        });

        it('glob should run a regexep against each item of a provided map', function() {
            var src = {
                'prop1.inside1.value1': 'value1',
                'prop1.inside1.array1': ['arr1', 'arr2'],
                'prop2.inside2.value2': 'value2'
            };
            var exp = {
                'prop2.inside2.value2': 'value2'
            };

            var rgp = /\.inside2\./;
            var out = Flattener.glob(src, rgp);
            expect(out).toMatchObject(exp);
        });

        it('invalidRegExpObj helper', function() {
            var out = Flattener.invalidRegExpObj(null);
            expect(out).toBeFalsy();

            out = Flattener.invalidRegExpObj(undefined);
            expect(out).toBeFalsy();

            out = Flattener.invalidRegExpObj(23);
            expect(out).toBeFalsy();
        });
    });
});