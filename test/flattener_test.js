'use strict';

const test = require('tape');

const Flattener = require('../src/flattener');

test('Flattener should get key path', t => {
    t.ok(Flattener.flatten);
    t.ok(Flattener.unflatten);
    t.end();
});
