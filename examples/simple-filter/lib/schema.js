Schemas = {};

Schemas.Table = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    priority: {
        type: String,
        label: "Priority",
        allowedValues: ["low", "medium", "high"]
    },
    deadline: {
        type: Date,
        label: "Deadline"
    },
    repetitions: {
        type: Number,
        label: "Repetitions",
        optional: true
    },
    state: {
        type: Boolean,
        label: "State",
        allowedValues: [true, false]
    }/*,
    object: {
        type: Object,
        label: "Object"
    }*/
});