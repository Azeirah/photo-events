Template.settings.events({
    'click #logout': function (event, t) {
        event.preventDefault();
        Router.go('/logout');
    }
});