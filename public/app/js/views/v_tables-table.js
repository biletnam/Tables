define([
  'jquery', 
  'ui',
  'underscore', 
  'backbone',
  'text!templates/t_one_table.html'
  ], 
  function($, ui, _, Backbone, TableTemplate) {
  	var OneTableView = Backbone.View.extend({

      // ini

      tagName : 'a',

  		className : 'one-table',   

      attributes: function(){
        return {
          'style': 'top: ' + this.model.get('posTop') + 'px; left: ' + this.model.get('posLeft') + 'px',
          'href' : '#/order/' + this.model.cid
        };
      },

  		template : _.template(TableTemplate),
  		render: function () {
        // console.log(this.model);
  			this.$el.html(this.template( this.model.toJSON() ));

        this.$input = this.$el.find('.form-control');

        // console.log(this.model.cid);

  			return this;
  		},

      events: {
        'dblclick .title_text'  : 'editTitle',
        'blur .form-control'    : 'endEditTitle',
        'click .remove'         : 'removeTable',
        'click '                : 'setOrderTable'
      },

      initialize : function () {


        this.listenTo(this.model, 'change', this.render);

        var self = this;

        this.$el.draggable(
          {
            zIndex: 100,
            cursor: "move",
            stack: '.one-table',
            stop: function ( event, ui ) {
              // console.log(ui);
              var Data = {
                posTop : ui.position.top,
                posLeft : ui.position.left
              };
              self.model.save( Data );
            }
          }
        );
      },


      // Functions

      setOrderTable : function (e) {
        if( $(e.target).hasClass('title_text') ) { return false };
        // return false;
      },

      removeTable : function () {
        // удаление модели
        this.model.destroy();
        // удаление представления
        this.remove();
        // Остановка слушателей события
        this.stopListening();

        return false;
      },

      saveTitle : function () {  
        var Data = {
          title : this.$input.val()
        };

        this.model.save( Data );
      },

      editTitle : function () {
        this.$el.addClass('edit');
        this.$input.focus();

      },

      endEditTitle : function () {
        this.$el.removeClass('edit');
        this.saveTitle();
      }

  	});

  	return OneTableView;
	}
);
