UI.registerHelper("username", function () {
    var user = Meteor.users.findOne({
        _id: Meteor.userId()
    });
    console.log(user.username);
    return user.username;
});

UI.registerHelper("getUsername", function (_id) {
    return Meteor.users.findOne({_id: _id}).username;
});