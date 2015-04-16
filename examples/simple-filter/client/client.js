Template.registerHelper("log", function(opt){
  console.log(opt);
});

Meteor.subscribe('table');

Template.view_table.rendered = function(){
    Session.set("schema", "Table");
}

Template.view_table.helpers({
  selector: function (){
    var select = Session.get("filter_selector");
    console.log(select);
    return select ? select : null;
  }
});
