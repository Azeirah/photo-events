UI.registerHelper("username", function () {
    var user = Meteor.users.findOne({
        _id: Meteor.userId()
    });
    return user.username;
});

UI.registerHelper("getUsername", function (_id) {
    var user = Meteor.users.findOne({_id: _id});
    console.dir(user);
    return user.username;
});

UI.registerHelper("formatDate", function (epoch) {
    console.log(epoch);
    var date = new Date(epoch);
    var hours = ("00" + date.getHours()).slice(-2);
    var minutes = ("00" + date.getMinutes()).slice(-2);

    return $.datepicker.formatDate('DD M', date) + " " + hours + ":" + minutes;
});