if(Meteor.isClient){

Session.set("filter_counter", [1]);
Session.set("filter_selector", '');
Session.set("filter_queries", {});
Session.set("filter_ops", {});

operators = {
    "String":[
        "=",
        "contains",
        "regex"
    ],
    "Number":[
        "=",
        ">",
        "<"
    ],
    "Boolean": [
        "="
    ],
    "Date": [
        "=",
        "<",
        ">"
    ],
    "Object": [
        "has value",
        "has key"
    ]
}

//filter_operators = ["true", "false", "AND", "OR", "FieldExpr"];
filter_operators = ["AND", "OR"];

var object_values = function(obj){
    var values = [];
    var keys = Object.keys(obj);
    for(var i in keys){
        values.push(obj[keys[i]]);
    }
    return values;
}

dropdown_select = function(elem, htmlid){
    $("#"+htmlid + ":first-child").text(elem.label).append('<span class="caret"></span>');
    $("#"+htmlid + ":first-child").val(elem.value);
}

create_selector = function(field, operator, value, type, options){
    var select = {};
    switch(operator){
        case "=":
            if(type == "Number")
                value = Number(value);
            if(type == "Date")
                value = new Date(value);
            if(type == "Boolean")
                value = Boolean(value);
            select[field] = value;
            return select;
            break;
        case ">":
            if(type == "Number")
                value = Number(value);
            if(type == "Date")
                value = new Date(value);
            select[field] = {$gt: value};
            return select;
            break;
        case "<":
            if(type == "Number")
                value = Number(value);
            if(type == "Date")
                value = new Date(value);
            select[field] = {$lt: value};
            return select;
            break;
        case "contains":
            select[field] = {$regex: value, $options: 'i'};
            return select;
            break;
        case "regex":
            select[field] = {$regex: value, $options: options};
            return select;
            break;
        /*
        case "has_key":
            select["$where"] = function() { return this.object.attribute };
            return select;
            break;
        case "has_value":
            select["$where"] = function() { return this.object[Object.keys(this.object)[0]] == "complex"};
            return select;
            break;
        */
        default:
            return {};
    }
}

Template.expression_filter.rendered = function(){
    var no = Session.get("filter_counter");
    no = no[no.length-1];
    Blaze.renderWithData(Template.simple_filter, {"no": no}, document.getElementById('expression_filter'));
}

Template.filter_fields.helpers({
    fields: function(){
        if(Session.get("schema")){
            var fieldObj = Schemas[Session.get("schema")].schema();
            var keys = Object.keys(fieldObj);
            var fieldArr = [];
            for(k in keys){
                fieldObj[keys[k]].value = keys[k];
                fieldArr.push(fieldObj[keys[k]]);
            }
            return fieldArr;
        }
    }
});

Template.filter_fields.events({
    'click .dropdown-menu li a': function(event){
        var no = Session.get("filter_counter");
        no = no[no.length-1];

        if($(event.target.parentElement.parentElement).attr("aria-labelledby") == "field" + no ){
            if(!$('#field_button').length)
                Blaze.render(Template.button_locations, document.getElementById('simple_filter' + no ));
            Session.set("autoform_options","{}");
            dropdown_select($(this)[0], "field" + no);
            var type = $(this)[0].type.name;
            $("#field" + no + ":first-child").attr("field_type", type);
            $('#field_operations' + no ).html('');
            Blaze.renderWithData(Template.filter_operations, {first: operators[type][0], all: operators[type], no: no}, document.getElementById('field_operations' + no ));
            $('#field_value' + no ).html('');
            $("#operator" + no + ":first-child").val(operators[type][0]);
            if($(this)[0].allowedValues){
                Blaze.renderWithData(Template.filter_value_select, {options: $(this)[0].allowedValues, no: no}, document.getElementById('field_value' + no ));
            }
            else
                if(type == "Date")
                    Blaze.renderWithData(Template.filter_value_datepicker, {no: no}, document.getElementById('field_value' + no ));
                else 
                    if($(this)[0].autoform && $(this)[0].autoform.options){
                            var options  = $(this)[0].autoform.options();
                            var values = [];
                            var map = {};
                            for(o in options){
                                values.push(options[o].label);
                                map[options[o].label] = options[o].value;
                            }
                            Session.set("autoform_options", JSON.stringify(map));
                            Blaze.renderWithData(Template.filter_value_select,  {options: values, no: no}, document.getElementById('field_value' + no ));
                        }
                    else
                        Blaze.renderWithData(Template.filter_value_input, {no:no}, document.getElementById('field_value' + no ));
            
            if($('#filter_operators' + no ).html() == '')
                Blaze.renderWithData(Template.filter_operators, {operators: filter_operators, no:no}, document.getElementById('filter_operators' + no ));
            if($('#filter_button_delete' + no ).html() == '')
                Blaze.renderWithData(Template.filter_button_delete, {no: no}, document.getElementById('filter_button_delete' + no));
            if($('#field_button_reset').html() == '')
                Blaze.render(Template.filter_button_reset, document.getElementById('field_button_reset'));
            if($('#field_button').html() == '')
                Blaze.render(Template.filter_button, document.getElementById('field_button'));
        }
    }
});

Template.filter_operations.events({
    'click .dropdown-menu li a': function(event){
        var no = Session.get("filter_counter");
        no = no[no.length-1];
        if($(event.target.parentElement.parentElement).attr("aria-labelledby") == "operator" + no ){
            var val = event.target.textContent;
            dropdown_select({"label": val, "value": val}, "operator" + no);
        }
    }
});

op_val = function(op){
    switch(op){
        case "AND":
            return "$and";
            break;
        case "OR":
            return "$or";
            break;
        default:
            return "$and";
    }
}

create_filter_selector = function(q, op, no){
    var operator = op_val(op[no]);

    var result = {};
    if(no > 0){
        var query1 = create_filter_selector(q, op, no-1);
        result[operator] = [ query1 , q[no+1] ];
    }
    else
        result[operator] = [ q[no], q[no+1] ] ;

    return result
}

set_filter_selector = function(no){
    if($('#filter_value' + no ).val()){
            if(Session.get("autoform_options") && Session.get("autoform_options") != "{}"){
                var map = Session.get("autoform_options");
                map = JSON.parse(map);
                var value = map[$('#filter_value' + no ).val()];
            }
            else
                var value = $('#filter_value' + no ).val();
            var field = $("#field" + no + ":first-child").val();
            var op = $("#operator" + no + ":first-child").val();
            var type = $("#field" + no + ":first-child").attr("field_type");
            var selector = create_selector(field, op, value, type);
            var queries = Session.get("filter_queries");
            //queries.push(selector);
            queries[no] = selector;
            Session.set("filter_queries", queries);
        }
}

Template.filter_button.events({
    'click #call_filter': function(){

        var no = Session.get("filter_counter");
        no = no[no.length-1]; 
        set_filter_selector(no);
        
        if(Object.keys(Session.get("filter_queries")).length == 1){            
            Session.set("filter_selector", Session.get("filter_queries")[no]);
        }
        else{
            var ops = object_values(Session.get("filter_ops"));
            Session.set("filter_selector", create_filter_selector(object_values(Session.get("filter_queries")), ops, ops.length-1));
        }
    }
});

Template.filter_button_delete.events({
    'click .delete_filter': function(event){
        var no = Number(event.currentTarget.id.match(/[0-9]+$/)[0]);
        $('#simple_filter' + no ).remove();

        Session.set("autoform_options","{}");
        var counter = Session.get("filter_counter");
        counter.splice(counter.indexOf(no),1);

        Session.set("filter_counter", counter);
        var queries = Session.get("filter_queries");

        delete queries[no];
        Session.set("filter_queries", queries);

        var ops = Session.get("filter_ops");
        delete ops[no];
        delete ops[no-1];

        Session.set("filter_ops", ops);
        $('#filter_operators_values' + counter[counter.length-1] ).val('...');

        if(counter.length == 0){
            Session.set("filter_counter", [1]);
            Blaze.renderWithData(Template.simple_filter, {"no": 1}, document.getElementById('expression_filter'));
            Session.set("filter_selector",'');
        }
        else
            if(Object.keys(Session.get("filter_queries")).length == 1){            
                Session.set("filter_selector", Session.get("filter_queries")[no-1]);
            }
            else
                Session.set("filter_selector", create_filter_selector(object_values(Session.get("filter_queries")), object_values(ops), Object.keys(ops).length-1));

        var counter = Session.get("filter_counter");

        Blaze.render(Template.button_locations, document.getElementById('simple_filter' + counter[counter.length-1] ));
        Blaze.render(Template.filter_button, document.getElementById('field_button'));
    }
});

Template.filter_operators.events({
    'change .filter_operators': function(event){
        // make sure all options are completed ( should disable operators until they are)
        var no = Number(event.currentTarget.id.match(/[0-9]+$/)[0]);
        set_filter_selector(no);
        var add = true;

        var op = $('#filter_operators_values' + no).val();
        var ops = Session.get("filter_ops");
        if(ops[no])
            add = false;
        ops[no] = op;
        Session.set("filter_ops", ops);

        if(add){
            var counter = Session.get("filter_counter");
            counter.push(counter[counter.length-1]+1);
            Session.set("filter_counter", counter);

            Blaze.renderWithData(Template.simple_filter, {"no": counter[counter.length-1]}, document.getElementById('expression_filter'));
            $('#field_button').remove();
            Blaze.render(Template.button_locations, document.getElementById('simple_filter' + counter[counter.length-1] ));
        }
    }
});

}