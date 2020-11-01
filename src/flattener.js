/*
 * flattener
 * https://github.com/goliatone/gflattener
 * Created with gbase.
 * Copyright (c) 2014 goliatone
 * Licensed under the MIT license.
 */
/* jshint strict: false, plusplus: true */
/*global define: false, require: false, module: false, exports: false */
(function(root, name, deps, factory) {
    'use strict';
    // Node
    if (typeof deps === 'function') {
        factory = deps;
        deps = [];
    }

    if (typeof exports === 'object') {
        module.exports = factory.apply(root, deps.map(require));
    } else if (typeof define === 'function' && 'amd' in define) {
        //require js, here we assume the file is named as the lower
        //case module name.
        define(name.toLowerCase(), deps, factory);
    } else {
        // Browser
        var d, i = 0,
            global = root,
            old = global[name],
            mod;
        while ((d = deps[i]) !== undefined) deps[i++] = root[d];
        global[name] = mod = factory.apply(global, deps);
        //Export no 'conflict module', aliases the module.
        mod.noConflict = function() {
            global[name] = old;
            return mod;
        };
    }
}(this, 'Flattener', function() {
    // define('flattener', function() {



    ///////////////////////////////////////////////////
    // CONSTRUCTOR
    ///////////////////////////////////////////////////

    /**
     * Flattener constructor
     *
     * @param  {object} config Configuration object.
     */
    var Flattener = {};

    Flattener.VERSION = '0.4.1';

    ///////////////////////////////////////////////////
    // PUBLIC METHODS
    ///////////////////////////////////////////////////

    /**
     * Flatten a deeply nested object into a map of a
     * single level where the keys match to original
     * string path of the property.
     *
     * @param  {Object} src    Object to be serialized
     * @return {Object}        Serialized object.
     */
    Flattener.flatten = function flatten(src, delimiter, /*private*/ prop, output) {
        prop || (prop = '');
        output || (output = {});
        delimiter || (delimiter = '.');

        var isEmpty = false;

        if (Object(src) !== src) output[prop] = src;
        else if (Array.isArray(src)) {
            for (var i = 0, l = src.length; i < l; i++) {
                flatten(src[i], delimiter, prop ? prop + delimiter + i : '' + i, output);
            }
            if (l === 0) output[prop] = [];
        } else {
            isEmpty = true;
            for (var p in src) {
                isEmpty = false;
                if (src !== src[p]) {
                    flatten(src[p], delimiter, prop ? prop + delimiter + p : p, output);
                }
            }
            if (isEmpty) output[prop] = {};
        }

        return (isEmpty === true) ? {} : output;
    };

    /**
     * Unflatten a map of string path keys
     * and values to a fully nested object.
     *
     * @param  {Object} src Map to be unmapped
     * @return {Object}
     */
    Flattener.unflatten = function unflatten(src, delimiter) {
        if (Object(src) !== src || Array.isArray(src)) return src;
        delimiter || (delimiter = '.');

        var result = {},
            cur, prop, idx, last, temp;
        for (var p in src) {
            cur = result, prop = '__ROOT__', last = 0;

            do {
                idx = p.indexOf(delimiter, last);
                temp = p.substring(last, idx !== -1 ? idx : undefined);
                cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
                prop = temp;
                last = idx + 1;
            } while (idx >= 0);

            cur[prop] = src[p];
        }

        return result['__ROOT__'] || {};
    };

    /**
     * Captures all object keys that match
     * a regexp pattern.
     * If `pattern` is not an actual RegExp
     * it will be converted to one using
     * `new RegExp(pattern)`
     *
     * @param  {Object} map     Source object
     * @param  {RegExp} pattern Matcher
     * @return {Object}         Object with the
     *                          subset of properties
     *                          matching `pattern`
     */
    Flattener.glob = function glob(map, pattern) {
        map || (map = {});
        var out = {},
            regexp = _invalidRegExpObj(pattern);

        if (!regexp) return out;

        Object.keys(map).forEach(function(key) {
            if (regexp.exec(key)) out[key] = map[key];
        });

        return out;
    };

    var _invalidRegExpObj = function(p) {
        if (!p || !p.constructor) return false;
        if (p.constructor === RegExp) return p;
        if (p.constructor === String) return new RegExp(p);
        return false;
    };


    Flattener.invalidRegExpObj = _invalidRegExpObj;

    return Flattener;
}));
