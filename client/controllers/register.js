Template.register.events({
    'submit #register-form': function(event, t) {
        event.preventDefault();
        var email = t.find('#register-email').value.toLowerCase();
        var password = t.find('#register-password').value;
        var username = t.find('#register-username').value;
        Accounts.createUser({
            email: email,
            password: password,
            username: username,
            profile: {
                friends: []
            }
        }, function(error) {
            if (error) {
                FlashMessages.sendError("Registration failed");
            } else {
                FlashMessages.sendInfo("Registration succesful");
                Meteor.loginWithPassword(password);
                Router.go('home');
            }
        });
    }
});