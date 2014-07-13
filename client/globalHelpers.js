UI.registerHelper("username", function () {
    var user = Meteor.users.findOne({
        _id: Meteor.userId()
    });
    return user.username;
});

UI.registerHelper("getUsername", function (_id) {
    try {
        var user = Meteor.users.findOne({_id: _id});
        return user.username;
    } catch (error) {
        return "Username error";
    }
});

UI.registerHelper("getLoggedInUsername", function () {
    return Meteor.user().username;
});

UI.registerHelper("formatDate", function (epoch) {
    var date = new Date(epoch);
    var hours = ("00" + date.getHours()).slice(-2);
    var minutes = ("00" + date.getMinutes()).slice(-2);

    return $.datepicker.formatDate('DD M', date) + " " + hours + ":" + minutes;
});

UI.registerHelper("getAllFriends", function () {
    if (Meteor.user()) {
        return Meteor.user().friends;
    }
});