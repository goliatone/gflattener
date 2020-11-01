'use strict';

const test = require('tape');

const Flattener = require('../src/flattener');

test('Flattener should export three methods', t => {
    t.ok(Flattener.flatten, 'OK latten method');
    t.ok(Flattener.unflatten, 'OK unflatten method');
    t.ok(Flattener.glob, 'OK glob method');
    t.end();
});


test('should flatten objects', t => {
    let src = {
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

    let out = Flattener.flatten(src);

    let expected = Flattener.unflatten(out);

    t.deepEquals(src, expected);
    t.end();
});

test('should flatten array of objects', t => {
    let src = {
        metadata: { ruckus: { id: 23 }, items: [{ id: 1 }] },
    };

    let out = Flattener.flatten(src);

    let expected = Flattener.unflatten(out);

    t.deepEquals(src, expected);
    t.end();
});


test('should unflatten objects', t => {
    let src = {
        'prop1.inside1.value1': 'value1',
        'prop1.array1.0': 'arr1',
        'prop1.array1.1': 'arr2',
        'prop2.inside2.value2': 'value2'
    };

    let expected = {
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

    let out = Flattener.unflatten(src);

    t.deepEquals(out, expected);
    t.end();
});

test('glob should run a regexep against each testem of a provided map', t => {
    let src = {
        'prop1.inside1.value1': 'value1',
        'prop1.inside1.array1': ['arr1', 'arr2'],
        'prop2.inside2.value2': 'value2'
    };

    let exp = {
        'prop2.inside2.value2': 'value2'
    };

    let rgp = /\.inside2\./;
    let out = Flattener.glob(src, rgp);

    t.deepEquals(out, exp);

    t.end();
});

test('invalidRegExpObj helper', t => {
    let out = Flattener.invalidRegExpObj(null);
    t.notOk(out);

    out = Flattener.invalidRegExpObj(undefined);

    t.notOk(out);

    out = Flattener.invalidRegExpObj(23);
    t.notOk(out);
    t.end();
});


test('should flatten objects using custom delimiter', t => {
    let expected = {
        'prop1/inside1/value1': 'value1',
        'prop1/array1/0': 'arr1',
        'prop1/array1/1': 'arr2',
        'prop2/inside2/value2': 'value2'
    };

    let src = {
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

    let out = Flattener.flatten(src, '/');

    t.deepEquals(out, expected);
    t.end();
});

test('should unflatten objects using custom delimiter', t => {
    let src = {
        'prop1/inside1/value1': 'value1',
        'prop1/array1/0': 'arr1',
        'prop1/array1/1': 'arr2',
        'prop2/inside2/value2': 'value2'
    };

    let expected = {
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

    let out = Flattener.unflatten(src, '/');

    t.deepEquals(out, expected);
    t.end();
});
