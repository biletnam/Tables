define([ 
  'underscore', 
  'backbone',
  'models/m_table'
], function (_, Backbone, TableModel) {
    var TablesCollection = Backbone.Collection.extend({
        model : TableModel,
        url : '/api/tables'
    });

    return new TablesCollection();
});

