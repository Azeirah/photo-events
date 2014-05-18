Template.register.events({
    'submit #register-form': function (event, t) {
        event.preventDefault();
        var email = t.find('#register-email').value;
        var password = t.find('#register-password').value;
        var username = t.find('#register-username').value;
        Accounts.createUser({email: email, password: password}, function (error) {
           if (error) {
                FlashMessages.sendError("Registration failed");
           } else {
                FlashMessages.sendInfo("Registration succesful");
                Meteor.loginWithPassword(email, password);
                Router.go('home');
           }
        });
    }
});

Template.login.events({
    'submit #login-form': function (event, t) {
        event.preventDefault();
        var email = t.find('#login-email').value;
        var username = t.find('#login-username').value;
        Meteor.loginWithPassword(email, password, function (error) {
            if (error) {
                FlashMessages.sendError("Login failed");
            } else {
                FlashMessages.sendInfo("Login succesful");
                Router.go('home');
            }
        });
    }
});

Template.home.events({
    'click #logout': function (event, t) {
        event.preventDefault();
        Meteor.logout();
    }
});

Template.home.username = function () {
    var user = Meteor.users.findOne({
        _id: Meteor.userId()
    });
    console.log(user.emails[0]);
    return user.emails[0].address;
};