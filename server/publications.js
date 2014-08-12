Meteor.publish("Events", function () {
    return Events.find({organizer: this.userId}, {limit:10});
});

Meteor.publish("allUsers", function () {
    return Meteor.users.find({}, {
        fields: {
           "username": 1,
           "profile.friends": 1
        }
    });
});

// Meteor.publish("friends", function () {
//     return Meteor.users.find({
//         "profile.friends._id": Meteor.userId()
//     }, fields: {
//         username: 1,
//         profile: 1
//     });
// });
