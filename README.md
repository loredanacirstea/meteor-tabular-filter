# meteor-tabular-filter

https://atmospherejs.com/loredanacirstea/meteor-tabular-filter


It only works with bootstrap now, so you will have to add:

    meteor add twbs:bootstrap
    meteor add loredanacirstea:meteor-tabular-filter
    

Recommended only for personal use: making quick querries on your data. For this, see demo at http://simple-filter.meteor.com , with source at: https://github.com/loredanacirstea/simple-filter.

This package is not actively maintained as a default, but I will make small changes if there are easy to fix issues.

## Version

0.2.2

- added property exactMatch which means show only = in filter dropdown

0.2.1 - Changes: 

You can have custom labels, so `Session.set("schema", "Table");` is now: 

```
Session.set("tabular-filter", {
  schema: "Table", // the only one required
  label: "",
  and_label: "",
  or_label: "",
  input_value_placeholder: "",
  regex_value: "",
  contains_value: ""
});
```

You can use i18n and do: `label: i18n('On Field')`




## Description

This package offers a filter which gets data from an [aldeed:simple-schema](https://github.com/aldeed/meteor-simple-schema) object (collection structure). It outputs a `Mongo Selector` based on the chosen options from the `meteor-tabular-filter` UI. It is compatible with [aldeed:tabular](https://github.com/aldeed/meteor-tabular)'s `selector`.

Basically, meteor-tabular-filter just creates a filter UI from the colection structure and outputs a `Mongo Selector` (such as `{ $and: [ { priority: "medium" }, { state: true } ] }`) after the user chooses the options.

## What to expect

The `AND` / `OR` operations are done in the added order. Example:

![](https://raw.githubusercontent.com/loredanacirstea/simple-filter/master/public/simple-filter.png)

    Priority = medium AND Repetitions > 4 OR Deadline > 01/17/2015 AND State = true

will compute the first AND (Priority AND Repetitions), use the result with OR (result1 OR Deadline) and finally use the result with the second AND (result2 AND State).

## Bugs

When getting an unwanted result (ex. when deleting the first filter), refresh the page.


## How to Use

(see examples/simple-filter)

Set a Session variable with the name of your Simple Schema object.

    //examples/simple-filter/client/client.js

    Template.view_table.rendered = function(){
        Session.set("tabular-filter", {schema: "Table", label: 'On Field'});
    }

Set a template helper (or another method) from the filter's `filter_selector` Session variable.

    //examples/simple-filter/client/client.js

    Template.view_table.helpers({
      selector: function (){
        var select = Session.get("filter_selector");
        return select;
      }
    });

The Simple Schema object should have the form:

    //examples/simple-filter/lib/schema.js

    Schemas = {};
    Schemas.Table = new SimpleSchema({});


Add the `{{> expression_filter}}` template to your .html file

    //examples/simple-filter/client/client.html

    <div id="content">
        {{> expression_filter}} <!-- add this template for the filter -->
        {{> view_table}} <!-- template for the aldeed:meteor-tabular grid -->
    </div>

The `selector` template helper can be used with [aldeed:meteor-tabular](https://github.com/aldeed/meteor-tabular):

    //examples/simple-filter/client/client.html

    <template name="view_table">
        <div class="table-responsive">
            {{> tabular table=TabularTables.Table selector=selector class="table table-striped table-bordered table-hover table-condensed"}}
        </div>
    </template>

## Omit Schema Fields

If you have schema fields that you don't want to include, [extend SimpleSchema](https://github.com/aldeed/meteor-simple-schema#extending-the-schema-options) with: 

    SimpleSchema.extendOptions({
      tabularFilterOmit: Match.Optional(Boolean)
    });

and add `tabularFilterOmit: true` to your field, like this:

    deadline: {
        type: Date,
        label: "Deadline",
        tabularFilterOmit: true
    },

By [Loretek](http://loretek.ro)
