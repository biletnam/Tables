define([
	'underscore', 
  'backbone',
  'models/m_contact'
	], 
	function(_, Backbone, ContactModel) {
		var ContactsCollection = Backbone.Collection.extend({
			model : ContactModel,
			url : '/api/contacts'
		});

		return new ContactsCollection();
});