Template.register.events({
    'submit #register-form': function (event, t) {
        event.preventDefault();
        var email = t.find('#register-email').value;
        var password = t.find('#register-password').value;
        var username = t.find('#register-username').value;
        Accounts.createUser({email: email, password: password, username: username}, function (error) {
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

Template.settings.events({
    'click #logout': function (event, t) {
        event.preventDefault();
        Router.go('/logout');
    }
});

Template.resetPassword.events({
    'submit #resetPasswordForm': function (event, t) {
        event.preventDefault();
        var email = t.find("#user-email").value;
        console.log(email);
        Accounts.forgotPassword({
            email: email
        }, function (error) {
            if (error) console.log(error);
        });
    }
});

Template.changePassword.events({
    'submit #changePasswordForm': function (event, t) {
        event.preventDefault();
        console.log(Meteor.user().emails[0]);
        Accounts.forgotPassword({
            email: Meteor.user().emails[0].address
        }, function (error) {
            if (error) console.log(error);
        });
    }
});

Template.header.events({
    'click .menu-button': function (event, t) {
        $(".sidebarLeft").toggleClass('open');
    }
});

Template.newEvent.events({
    'click #newEvent': function (event, t) {
        Event.create(Meteor.userId());
    }
});