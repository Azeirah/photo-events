Template.friends.events({
    'keyup #addFriendSearch': function (event, t) {
        var searchQuery = event.target.value;
        if (searchQuery.length > 0) {
            var users = Meteor.users.find({"username": new RegExp(".*" + searchQuery + ".*")}).fetch();
            Session.set('people', users);
        } else {
            Session.set('people', []);
        }
    }
});

Template.friends.searchQuery = function () {
    if (Session.get("people")) {
        return Session.get("people");
    }
};

Meteor.subscribe('allUsers');