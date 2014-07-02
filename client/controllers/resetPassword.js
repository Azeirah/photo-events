Template.resetPassword.events({
    'submit #resetPasswordForm': function (event, t) {
        event.preventDefault();
        var email = t.find("#user-email").value.toLowerCase();
        console.log(email);
        Accounts.forgotPassword({
            email: email
        }, function (error) {
            if (error) console.log(error);
        });
    }
});