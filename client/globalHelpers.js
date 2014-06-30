UI.registerHelper("username", function () {
    var user = Meteor.users.findOne({
        _id: Meteor.userId()
    });
    console.log(user.username);
    return user.username;
});