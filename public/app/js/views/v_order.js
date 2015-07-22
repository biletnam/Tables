define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!templates/t_order.html',
    'bootstrap'
    ],
    function($, _, Backbone, OrderTemplate) {

        var OrderView = Backbone.View.extend({

            className : 'order',

            template : _.template(OrderTemplate),

            initialize : function () {
                  
            },

            render : function () {
                this.$el.html( this.template( this.model.toJSON() ) );
                return this;
            },

        });

        return OrderView;

    }
);