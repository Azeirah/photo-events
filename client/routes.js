Router.configure({
    layoutTemplate: 'header'
});

Router.onAfterAction(function () {
    if (!Meteor.userId()) {
        Router.go('home');
    }
}, {except: ['home', 'login', 'register']});

Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'home'
    });

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
                Router.go('/');
            }
        }
    });

    this.route('settings', {
        path: '/settings',
        template: 'settings'
    });

    this.route('featured', {
        path: '/featured',
        template: 'featured'
    });

    this.route('events', {
        path: '/events',
        template: 'events'
    });

    this.route('newEvent' , {
        path: '/newEvent',
        template: 'newEvent'
    });

    this.route('resetPasswordRequest', {
        path: '/resetPasswordRequest',
        template: 'resetPassword'
    });

    this.route('resetPassword', {
        controller: 'AccountController',
        path: '/reset-password/:token',
        action: 'resetPassword'
    });

    this.route('changePassword', {
        path: '/changePassword',
        template: 'changePassword'
    })

    this.route('verifyEmail', {
        controller: 'AccountController',
        path: '/verify-email/:token',
        action: 'verifyEmail'
    });

    // this.route('enrollAccount', {
    //     controller: 'AccountController',
    //     path: '/enroll-account/:token',
    //     action: 'resetPassword'
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