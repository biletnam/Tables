define([
  'jquery',
  'underscore', 
  'backbone',
  'views/v_login',
  'views/v_main',
  'models/m_session'
  ], function($, _, Backbone, LoginView, MainView, SessionModel){
  var AppView = Backbone.View.extend({
    el: $('#app'),

    events: {
      // Создать отдельно представление для блока авторизации
    },

    initialize : function () {
      this.ui = {        
        // inputs          : this.$el.find('#add-form .input-data'),
        // contacts_wrap   : this.$el.find('#all-contacts')
      };
      this.session = new SessionModel();
      this.session.on('change:is_logined', this.onSessionChange, this);
      //this.renderLoginPage();
      // this.onSessionChange(this.session);
      this.checkSession();
    },
    render : function () {
      console.log('test');
    },
    renderOne : function ( item ) {
      console.log('test');
    },
    renderLoginPage : function () {
      this.login = new LoginView({ model : this.session });
      // console.log(login.render().el);
      this.$el.append( this.login.render().el );
    },
    renderMainPage : function () {
      this.main = new MainView({ model : this.session });
      this.$el.append( this.main.render().el );
    },
    checkSession : function (callback) {
      var self = this;

      $.ajax({
        url     : '/sessionCheck',
        type    : 'POST',
        dataType : 'json',
        cache: false,

        // success : $.proxy(this.onSuccessAuth, this),
        success : function (data) {
          if (data.user) {
            self.session.set({ is_logined : true, user_name : data.user });
          } else {
            if (!self.session.get('is_logined')) {
              self.session.trigger('change:is_logined');
            };
            self.session.set({ is_logined : false, user_name : '' });
          };
        },
        error : function (argument) {
          console.log('Error');
        }

      });
/*
      if (callback) {
        callback(session_status);
      };*/
    },
    onSessionChange : function () {

      // is_logined true/false записал ли пользователь в сессию
      // console.log(this.session);
      var session_status = this.session.get('is_logined');

      if (session_status) {
        if (this.login) {
          this.login.remove();
        }

        this.renderMainPage();

      } else {

        if (this.main) {
          this.main.remove();
        }

        this.renderLoginPage();

      }

    }
  });
  return AppView;
});