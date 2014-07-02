/*global define:true requirejs:true*/
/* jshint strict: false */
requirejs.config({
    paths: {
        'flattener': 'flattener'
    }
});

define(['flattener'], function(Flattener) {
    console.log('Loading');
    var flattener = new Flattener();
    flattener.init();
});