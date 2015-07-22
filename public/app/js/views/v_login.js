define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/login.html'
  ], 
  function($, _, Backbone, loginTemplate) {
  	var LoginView = Backbone.View.extend({

      // ini
  		className : 'authorization',
      // el : $('#login'),

  		template : _.template(loginTemplate),

  		render: function () {
  			this.$el.html(this.template());
  			return this;
  		},

      events: {
        'click .login-submit' : 'auth'
      },

      initialize : function () {
        this.ui = {        
          inputs   : $('input')
        };
      },

      // Functions
      auth : function () {
        var data = {};

        this.ui.inputs = this.$el.find('.input');

        this.ui.inputs.each(function (i, item) {
          data[$(this).attr('name')] = $(this).val();
        });

        // data = 

        $.ajax({
          url     : '/login',
          type    : 'POST',
          data    : data,
          dataType : 'json',
          cache: false,

          success : $.proxy(this.onSuccessAuth, this),
          error : function (argument) {
            console.log('Error');
          }

        });

        return false;
      },

      onSuccessAuth : function (data) {
        // console.log(data);

        if (data.err) {
          console.log(data.err);
          return false;
        }
        this.model.set({ is_logined : true, user_name : data.user });
      },

  	});

  	return LoginView;
	}
);
