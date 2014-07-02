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
