define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/t_p_tables.html',
  'views/v_tables-table',
  'models/m_table'
  ], 
  function($, _, Backbone, TablesTemplate, OneTableView, TableModel) {
  	var TablesView = Backbone.View.extend({

      // ini
  		className : 'tables',
      // el : $('#login'),

  		template : _.template(TablesTemplate),

  		render: function () {
  			this.$el.html(this.template());
  			return this;
  		},

      events: {
        'click .add-new-table' : 'addTableView'
      },

      initialize : function () {
        this.collection.fetch({reset: true});

        this.listenTo(this.collection, 'add', this.renderOne)
        this.listenTo( this.collection, 'reset', this.renderAll );
      },


      // Functions

      renderAll : function () {
        this.collection.each(function(item) {
          this.renderOne( item );
        }, this);
      },

      renderOne : function (item) {
        var table = new OneTableView({
          model : item
        });
        this.$('.tables-bloks').append(table.render().el);
      },

      addTableView : function () {
        /*console.log('click');

        var one_table = new OneTableView({ model: new TableModel() });
        this.$('.tables-bloks').append(one_table.render().el);*/
        var Data = {};
            //Data.posTop:  this.$el.css('top');
            //Data.posLeft: this.$el.css('left');

        this.collection.create( Data );

        return false;
      }

  	});

  	return TablesView;
	}
);
