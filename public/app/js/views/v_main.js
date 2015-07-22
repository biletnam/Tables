define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/main.html',
  'routers/r_main',
  'views/v_tables',
  'views/v_order',
  'collections/c_tables'
  ], 
  function($, _, Backbone, mainTemplate, MainRouter, TablesView, OrderView, TablesCollection) {

  	var MainView = Backbone.View.extend({

      // ini
  		className : 'main-page',

  		template : _.template(mainTemplate),


      events: {
      },

      ui : {},

      views : {},

      initialize : function () {
      /*  this.ui.page_content = this.$el.find('.main-page-content');
        console.log(this.ui.page_content.length);*/
        var mainRouter = new MainRouter();
        mainRouter.on('route:showTables', this.showTables, this);
        mainRouter.on('route:setOrderTable', this.setOrderTable, this);
        
        Backbone.history.start();
      },
      render: function () {
        
        this.$el.html( this.template( this.model.toJSON() ) );
        this.$content = this.$el.find('.main-page-content');

        return this;
      },

      // Functions

      // Route 
      showTables : function () {
        this.views.tables = new TablesView({
          collection : TablesCollection
        });
        this.$content.html( this.views.tables.render().el );
      },

      setOrderTable : function (id) {
        var model = TablesCollection.get(id);
        var order = new OrderView({
          model : model
        });

        this.$content.html( order.render().el );
      }

  	});

  	return MainView;
	}
);
