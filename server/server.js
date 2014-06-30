//sets up a global logger object server-side
// logger = Meteor.require('winston');

// sets up meteor to send email via gmail (current with tijntjex@gmail.com)
process.env.MAIL_URL="smtp://tijntjex%40gmail.com:kOLtezooi5@smtp.gmail.com:465/";

Accounts.emailTemplates.verifyEmail.html = function (user, url) {
    return Handlebars.templates['verifyEmail']({
        user: user.username,
        url: url
    });
};

Accounts.emailTemplates.resetPassword.html = function (user, url) {
    return Handlebars.templates['passwordResetEmail']({
        user: user.username,
        url: url
    });
};

(function () {
    "use strict";

    Accounts.urls.resetPassword = function (token) {
        return Meteor.absoluteUrl('reset-password/' + token);
    };

    Accounts.urls.verifyEmail = function (token) {
        return Meteor.absoluteUrl('verify-email/' + token);
    };

    Accounts.urls.enrollAccount = function (token) {
        return Meteor.absoluteUrl('enroll-account/' + token);
    };

})();