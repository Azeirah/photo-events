Template.register.events({
    'submit #register-form': function (event, t) {
        event.preventDefault();
        var email = t.find('#register-email').value.toLowerCase();
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

Template.settings.events({
    'click #logout': function (event, t) {
        event.preventDefault();
        Router.go('/logout');
    }
});

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

Template.sidebarLeft.rendered = function () {
    console.log("slidebars ready, sidebarleft rendered");
    $.slidebars();
};

Template.newEvent.loadDateInputs = function () {
    Meteor.defer(function loadDateInputsDefer () {
        var twoHoursMillis = 7200000; // two hours in milliseconds
        $('.time').timepicker({
            'showDuration': true,
            'timeFormat': 'H:s'
        });
        $('.date').datepicker({
            'format': 'dd/mm/yyyy',
            'autoclose': true
        });
        $('#newEventForm').datepair({
            defaultTimeDelta: twoHoursMillis
        });
    });
};

Template.newEvent.events({
    'click #newEvent': function (event, t) {
        var hour = 3600; // seconds
        var name = $(t.find("#eventName")).val();
        var startDate = $(t.find("#eventStartDate"));
        var endDate = $(t.find("#eventEndDate"));
        var startDateNum = +new Date(startDate.val());
        var endDateNum = +new Date(endDate.val());
        var validInput = true;
        console.log(endDate.val());
        if (endDate.val().length !== 0 && startDate.val().length !== 0) {
            if ((endDateNum - startDateNum) < hour) {
                FlashMessages.sendError("Your event must last longer than one hour");
                validInput = false;
            }
        } else {
            FlashMessages.sendError("Your event must have a start date and end date.");
            validInput = false;
        }
        if (name.length === 0) {
            FlashMessages.sendError("Your event must have a name");
            validInput = false;
        }
        if (validInput) {
            Event.create(Meteor.userId(), name, startDateNum, endDateNum);
        }
    }
});
