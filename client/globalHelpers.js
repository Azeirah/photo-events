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
        return "There's an error retrieving the organizer's name";
    }
});

UI.registerHelper("formatDate", function (epoch) {
    console.log(epoch);
    var date = new Date(epoch);
    var hours = ("00" + date.getHours()).slice(-2);
    var minutes = ("00" + date.getMinutes()).slice(-2);

    return $.datepicker.formatDate('DD M', date) + " " + hours + ":" + minutes;
});