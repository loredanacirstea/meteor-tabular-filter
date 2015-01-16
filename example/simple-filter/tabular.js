TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);


TabularTables.Table = new Tabular.Table({
  name: "Table",
  collection: Table,
  pub: "tabular_table",
  columns: [
    {data: "title", title: "Title"},
    {data: "priority", title: "Priority"},
    {
      data: "deadline",
      title: "Deadline",
      render: function (val, type, doc) {
        if (val instanceof Date) {
          return moment(val).calendar();
        } else {
          return "Never";
        }
      }
    },
    {data: "repetitions", title: "Repetitions"},
    {data: "state", title: "State"}/*,
    {
      data: "object", title: "Object",
      render: function (val, type, doc) {
        return JSON.stringify(val);
      }
    }*/
  ]
});