define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/contact.html'
  ], 
  function($, _, Backbone, contactTemplate) {
  	var ContactView = Backbone.View.extend({

      // ini
  		className : 'person',

  		template : _.template(contactTemplate),

  		render: function () {
  			this.$el.html(this.template( this.model.toJSON() ));
  			return this;
  		},

      events: {
        "click .edit"   : "editContact",
        "click .remove" : "removeContact",
        "click .done"   : "updateContact"
      },

      initialize : function () {
        this.ui = {        
          inputs   : this.$el.find('.input-data')
        };
        this.listenTo(this.model, 'change', this.render);
      },

      // Functions
      removeContact : function () {
        // удаление модели
        this.model.destroy();
        // удаление представления
        this.remove();
        // Остановка слушателей события
        this.stopListening();

        return false;
      },

      editContact : function () {
          
        this.$el.addClass('editing');

        return false;
      },

      updateContact : function () {
        
        this.$el.removeClass('editing');

        var Data = {};

        this.$el.find('.input-data').each(function (i, el) {
          Data[$(this).attr('name')] = $(this).val().replace(/\s+/g, '');
        });

        this.model.save( Data );

        //this.remove();

        return false;
      }

  	});

  	return ContactView;
	}
);
