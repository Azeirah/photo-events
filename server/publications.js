Meteor.publish("Events", function () {
    return Events.find({});
});

Meteor.publish("allUsers", function () {
    console.log("publishing users");
    return Meteor.users.find({}, {
        fields: {
            username: 1
        }
    });
});