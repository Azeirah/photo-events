UI.registerHelper("getUsername", function (userId) {
    if (userId) {
        return Meteor.users.findOne({_id: userId}).username;
    } else {
        return Meteor.user().username;
    }
});

UI.registerHelper("formatDate", function(epoch) {
    var date = new Date(epoch);
    var hours = ("00" + date.getHours()).slice(-2);
    var minutes = ("00" + date.getMinutes()).slice(-2);

    return $.datepicker.formatDate('dd-mm-yy', date);
});

UI.registerHelper("getAllFriends", function() {
    if (Meteor.user()) {
        return Meteor.user().profile.friends;
    }
});
