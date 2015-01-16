# meteor-tabular-filter

    meteor add loredanacirstea:meteor-tabular-filter

## Version

!!
0.1.1 - It is a buggy, in-work prototype. The structure of the code will change in the very near future (1-2 weeks).

I recommend this version only for personal use if you want to make quick querries on your data. For this, see demo at http://simple-filter.meteor.com (app code in the `examples` folder)

## Description

This package offers a filter which gets data from an [aldeed:simple-schema](https://github.com/aldeed/meteor-simple-schema) object (collection structure). It outputs a `Mongo Selector` based on the chosen options from the `meteor-tabular-filter` UI. It is compatible with [aldeed:tabular](https://github.com/aldeed/meteor-tabular)'s `selector`.

## What to expect

The `AND` / `OR` operations are done in the added order. Example:

![](https://raw.githubusercontent.com/loredanacirstea/meteor-tabular-filter/master/examples/simple-filter/public/simple-filter.png)

    Priority = medium AND Repetitions > 4 OR Deadline > 01/17/2015 AND State = true

will compute the first AND (Priority AND Repetitions), use the result with OR (result1 OR Deadline) and finally use the result with the second AND (result2 AND State).

## Bugs

When getting an unwanted result (ex. when deleting the first filter), refresh the page.


## How to Use

(see examples/simple-filter)

Set a Session variable with the name of your Simple Schema object.

    //examples/simple-filter/client/client.js

    Template.view_table.rendered = function(){
        Session.set("schema", "Table");
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



By [Loretek](http://loretek.ro)
