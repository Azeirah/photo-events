Meteor.publish("Events", function () {
    return Events.find({});
});

Meteor.publish("allUsers", function () {
    return Meteor.users.find({}, {
        fields: {
           username: 1,
           friends: 1
        }
    });
});