define([
	'underscore', 
 	'backbone'
	], 
	function(_, Backbone) {
		var TableModel =  Backbone.Model.extend({
			defaults : {
				title   : 'Новый столик',
				posTop  : 0,
				posLeft : 0,
				count	: 4
				
			},
			idAttribute: '_id'
		});

		return TableModel;

});