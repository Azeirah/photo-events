Template.login.events({
    'submit #login-form': function (event, t) {
        event.preventDefault();
        var email = t.find('#login-email').value.toLowerCase();
        var password = t.find('#login-password').value;
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