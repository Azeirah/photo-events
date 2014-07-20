Router.configure({
    layoutTemplate: 'header',
    notFoundTemplate: 'home'
});

// redirect not-logged in users home if they are not on any of the "except" pages
Router.onAfterAction(function () {
    if (!Meteor.userId()) {
        Router.go('home');
    }
}, {except: ['home', 'login', 'register', 'verifyEmail', 'resetPassword', 'resetPasswordRequest']});

Router.onBeforeAction('loading');

Router.map(function () {
    this.route('register', {
        path: '/register',
        template: 'register',
        onBeforeAction: function () {
            if (Meteor.user()) {
                Router.go('home');
            }
        }
    });

    this.route('login', {
        path: '/login',
        template: 'login',
        onBeforeAction: function () {
            if (Meteor.user()) {
                Router.go('home');
            }
        }
    });

    this.route('logout', {
        path: '/logout',
        template: 'logout',
        onAfterAction: function () {
            if (Meteor.userId()) {
                Meteor.logout();
                $.slidebars.close('left');
                Router.go('/');
            }
        }
    });

    this.route('home', {
        path: "/"
    });
    this.route('settings');
    this.route('featured');
    this.route('evts');
    this.route('newEvent');
    this.route('changePassword');
    this.route('friends');

    this.route('resetPasswordRequest', {
        path: '/resetPasswordRequest',
        template: 'resetPassword'
    });

    this.route('resetPassword', {
        controller: 'AccountController',
        path: '/reset-password/:token',
        action: 'resetPassword'
    });


    this.route('verifyEmail', {
        controller: 'AccountController',
        path: '/verify-email/:token',
        action: 'verifyEmail'
    });

    // this.route('enrollAccount', {
    //     controller: 'AccountController',
    //     path: '/enroll-account/:token',
    //     action: 'resetPassword'meteor site:reddit.com
    // });
});

AccountController = RouteController.extend({
    resetPassword: function () {
        Accounts.resetPassword(this.params.token, prompt('enter new password'), function () {
            Router.go('/');
        });
    },
    verifyEmail: function () {
        Accounts.verifyEmail(this.params.token, function () {
            Router.go('/');
        });
    }
});
