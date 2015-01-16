Meteor.publish('tabular_table', function (tableName, ids, fields) {
    check(tableName, String);
    check(ids, [String]);
    check(fields, Match.Optional(Object));

    return Table.find({_id: {$in: ids}}, {fields: fields});
});


Meteor.startup( function (){

    if(Table.find().count() === 0 ) {

        var inserts = [
            {
                title:'Hello',
                priority: "high",
                deadline: new Date('Dec 24, 2013'),
                repetitions: 4,
                state: true,
                object: {version: "0.9"}
            },
            {
                title:'Hello There!',
                priority: "high",
                deadline: new Date('Dec 23, 2014'),
                repetitions: 4,
                state: true,
                object: {version: "0.8"}
            },
            {
                title:'Project Swim',
                priority: "low",
                deadline: new Date('Nov 21, 2014'),
                repetitions: 3,
                state: false,
                object: {fun: "yes"}
            },
            {
                title:'Joking Around',
                priority: "medium",
                deadline: new Date('Sep 04, 2013'),
                repetitions: 5,
                state: true,
                object: {attribute: "complex"}
            },
            {
                title:'To the Mountains!',
                priority: "high",
                deadline: new Date('Mar 17, 2014'),
                repetitions: 6,
                state: false,
                object: {attribute: "nasty"}
            },
            {
                title:'Swimming with Sharks',
                priority: "low",
                deadline: new Date('Jan 01, 2014'),
                repetitions: 8,
                state: false,
                object: {fun: "yes"}
            },
            {
                title:'Dive Ahead',
                priority: "medium",
                deadline: new Date('Aug 27, 2014'),
                repetitions: 2,
                state: true,
                object: {attribute: "nasty"}
            },
            {
                title:'MasterSide',
                priority: "high",
                deadline: new Date('Jun 29, 2014'),
                repetitions: 3,
                state: false,
                object: {attribute: "complex"}
            },
            {
                title:'Around the Corner',
                priority: "low",
                deadline: new Date('Oct 12, 2014'),
                repetitions: 12,
                state: true,
                object: {fun: "no"}
            },
            {
                title:'Get Some Milk',
                priority: "high",
                deadline: new Date('Jan 14, 2015'),
                repetitions: 23,
                state: false,
                object: {attribute: "nasty"}
            },
            {
                title:'Around the Clock',
                priority: "medium",
                deadline: new Date('Mar 14, 2015'),
                repetitions: 13,
                state: true,
                object: {attribute: "nasty"}
            },
            {
                title:'Something Boring',
                priority: "low",
                deadline: new Date('Nov 14, 2015'),
                repetitions: 9,
                state: false,
                object: {fun: "yes"}
            },
            {
                title:'The Force be With You',
                priority: "high",
                deadline: new Date('Sep 20, 2015'),
                repetitions: 8,
                state: true,
                object: {attribute: "pretty"}
            },
            {
                title:'Gastly Meal',
                priority: "medium",
                deadline: new Date('Sep 12, 2015'),
                repetitions: 6,
                state: false,
                object: {fun: "yes"}
            },
            {
                title:'Bring It On!',
                priority: "low",
                deadline: new Date('Mar 14, 2015'),
                repetitions: 3,
                state: true,
                object: {attribute: "complex"}
            },
            {
                title:'More than Deserved',
                priority: "high",
                deadline: new Date('Sep 15, 2015'),
                repetitions: 2,
                state: false,
                object: {fun: "no"}
            },
            {
                title:'Something',
                priority: "medium",
                deadline: new Date('Nov 16, 2015'),
                repetitions: 1,
                state: true,
                object: {attribute: "pretty"}
            },
            {
                title:'Yeah Rigth',
                priority: "high",
                deadline: new Date('Sep 22, 2015'),
                repetitions: 1,
                state: true,
                object: {attribute: "pretty"}
            },
            {
                title:'Really?',
                priority: "high",
                deadline: new Date('Jan 27, 2015'),
                repetitions: 1,
                state: true,
                object: {fun: "no"}
            },
            {
                title:'Garret',
                priority: "medium",
                deadline: new Date('Jan 23, 2015'),
                repetitions: 3,
                state: false,
                object: {version: "1.9"}
            },
            {
                title:'A Car',
                priority: "high",
                deadline: new Date('Jan 25, 2015'),
                repetitions: 4,
                state: true,
                object: {version: "2.9"}
            },
            {
                title:'Hello',
                priority: "medium",
                deadline: new Date('Nov 27, 2015'),
                repetitions: 2,
                state: true,
                object: {fun: "yes"}
            },
            {
                title:'Hello Again',
                priority: "high",
                deadline: new Date('Apr 28, 2015'),
                repetitions: 5,
                state: true,
                object: {attribute: "pretty"}
            },
            {
                title:'Morning Jogg',
                priority: "medium",
                deadline: new Date('Mar 23, 2015'),
                repetitions: 4,
                state: true,
                object: {version: "0.2"}
            },
            {
                title:'Meet Me at Dawn',
                priority: "low",
                deadline: new Date('Jan 23, 2015'),
                repetitions: 4,
                state: true,
                object: {attribute: "complex"}
            },
            {
                title:'Park the Car',
                priority: "high",
                deadline: new Date('Feb 20, 2015'),
                repetitions: 4,
                state: true,
                object: {attribute: "pretty"}
            },
            {
                title:'Get Away',
                priority: "medium",
                deadline: new Date('Nov 15, 2015'),
                repetitions: 4,
                state: false,
                object: {version: "0.4"}
            },
            {
                title:'Travel Through Time',
                priority: "high",
                deadline: new Date('Feb 15, 2015'),
                repetitions: 4,
                state: true,
                object: {attribute: "complex"}
            },
            {
                title:'Fly',
                priority: "medium",
                deadline: new Date('Feb 15, 2015'),
                repetitions: 6,
                state: true,
                object: {attribute: "pretty"}
            },
            {
                title:'Go Home',
                priority: "low",
                deadline: new Date('Feb 16, 2015'),
                repetitions: 3,
                state: true,
                object: {attribute: "pretty"}
            },
            {
                title:'Hello',
                priority: "high",
                deadline: new Date('Mar 16, 2015'),
                repetitions: 3,
                state: true,
                object: {attribute: "complex"}
            },
            {
                title:'Jojo',
                priority: "low",
                deadline: new Date('Apr 18, 2015'),
                repetitions: 3,
                state: false,
                object: {version: "pretty"}
            }
        ]

        _.each(inserts, function(doc) { 
          Table.insert(doc);
        });
    }
});