define([
  'jquery',
  'underscore', 
  'backbone'
  ], function($, _, Backbone){

    var MainRouter = Backbone.Router.extend({
        routes : {
            'tables' : "showTables",
            'order/:id' : "setOrderTable",
            "*other" : "defaultRoute"
        },
        initialize : function () {
            // console.log('router');
        },

        defaultRoute : function () {
            // console.log('I defaultRoute');
        },
        
        showTables : function () {
            // console.log('I show Tables');
        },

        setOrderTable : function (id) {
            // console.log('I set Order: ' + id);
        }
    });

    return MainRouter;
});