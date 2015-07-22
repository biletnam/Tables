require.config({
  baseUrl: 'app/js/',
  paths: {
    jquery:     'lib/jquery-2.1.4.min',
    ui:         'lib/jquery-ui.min',
    underscore: 'lib/underscore',
    backbone:   'lib/backbone',
    tmpl:       'lib/jquery-tmpl',
    bootstrap:  'lib/bootstrap.min',
    text:       'lib/require/text'
  },

  shim: {
    tmpl : {
      deps: [ 'jquery' ],
      exports: 'tmpl'
    },
    
    underscore: {
      exports: '_'
    },

    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    },

    ui: {
      deps: [ 'jquery' ],
      exports: 'ui'
    },

    bootstrap: {
      deps: [ 'jquery' ],
      exports: 'bootstrap'
    }
  }

});

define([ 'jquery', 'views/v_app'], function($, AppView){
  $(function () {
   /* var app_view = new AppView({
      collection: AppCollection
    }); */
    var app_view = new AppView();
  })
});
