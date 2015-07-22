define([
	'underscore', 
  	'backbone'
	], 
	function(_, Backbone) {
		var SessionModel =  Backbone.Model.extend({
			defaults : {
				is_logined : false,
				user_name : ''
			},
			// idAttribute: '_id'
		});

		return SessionModel;
});