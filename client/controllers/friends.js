Template.friends.events({
    'keyup #addFriendSearch': function (event, t) {
        var searchQuery = event.target.value;
        if (searchQuery.length > 0) {
            console.log("looking for " + searchQuery);
            var users = Meteor.users.find({"username": new RegExp(".*" + searchQuery + ".*")}).fetch();
            _.each(users, function (user) {
                console.dir(user);
            });
        }
    }
});

Meteor.subscribe('allUsers');