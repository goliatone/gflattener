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
    "use strict";
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
}(this, "Flattener", function() {

    /**
     * Extend method.
     * @param  {Object} target Source object
     * @return {Object}        Resulting object from
     *                         meging target to params.
     */
    var _extend = function extend(target) {
        var sources = [].slice.call(arguments, 1);
        sources.forEach(function(source) {
            for (var property in source) {
                if (source[property] && source[property].constructor &&
                    source[property].constructor === Object) {
                    target[property] = target[property] || {};
                    target[property] = extend(target[property], source[property]);
                } else target[property] = source[property];
            }
        });
        return target;
    };

    /**
     * Shim console, make sure that if no console
     * available calls do not generate errors.
     * @return {Object} Console shim.
     */
    var _shimConsole = function() {
        var empty = {},
            con = {},
            noop = function() {},
            properties = 'memory'.split(','),
            methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
                'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' +
                'table,time,timeEnd,timeStamp,trace,warn').split(','),
            prop,
            method;

        while (method = methods.pop()) con[method] = noop;
        while (prop = properties.pop()) con[prop] = empty;

        return con;
    };


    ///////////////////////////////////////////////////
    // CONSTRUCTOR
    ///////////////////////////////////////////////////

    /**
     * Flattener constructor
     *
     * @param  {object} config Configuration object.
     */
    var Flattener = {};

    Flattener.VERSION = '0.0.1'

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
    Flattener.flatten = function flatten(src, /*private*/ prop, output) {
        prop || (prop = '');
        output || (output = {});

        if (Object(src) !== src) output[prop] = src;
        else if (Array.isArray(src)) {
            for (var i = 0, l = src.length; i < l; i++) {
                flatten(src[i], prop ? prop + '.' + i : '' + i, output);
            }
            if (l === 0) output[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in src) {
                isEmpty = false;
                flatten(src[p], prop ? prop + '.' + p : p, output);
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
    Flattener.unflatten = function unflatten(src) {
        if (Object(src) !== src || Array.isArray(src)) return src;

        var result = {}, cur, prop, idx, last, temp;
        for (var p in src) {
            cur = result, prop = '__ROOT__', last = 0;

            do {
                idx = p.indexOf('.', last);
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
     * a regexp pattern
     * @param  {Object} map     Source object
     * @param  {RegExp} pattern Matcher
     * @return {Object}         Object with the
     *                          subset of properties
     *                          matching `pattern`
     */
    Flattener.glob = function glob(map, pattern) {
        map || (map = {});
        var out = {};
        Object.keys(map).forEach(function(key) {
            if (key.match(pattern)) out[key] = map[key];
        });
        return out;
    };

    return Flattener;
}));