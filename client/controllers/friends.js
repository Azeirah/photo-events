var validateUsername = function(username) {
    return Meteor.users.find({
        "username": username
    }).fetch().length === 1;
};

var change = function() {
    var $btn = $(".addFriendButton");
    if (validateUsername($("#addFriendSearch").val())) {
        $btn.show();
    } else {
        $btn.hide();
    }
};

Template.friends.events({
    'keyup #addFriendSearch': change,
    'click .addFriendButton': function() {
        var username = $("#addFriendSearch").val();
        if (validateUsername(username)) {
            var user = Meteor.users.findOne({
                username: username
            });
            Friend.request(user._id);
        }
    }
});

Template.friends.hasFriends = function() {
    return Meteor.user().profile.friends.length > 0;
};

Template.friends.methods = function() {
    // TODO: This fetches *all* users, this will get messy when you have a few million users.
    Deps.autorun(function() {
        var selfUser = Meteor.user();
        var friends = _.pluck(selfUser.profile.friends, "_id");
        var users = Meteor.users.find({}).fetch();
        var names = users.map(function(user) {
            if (!user.username === selfUser.username && !_.contains(friends, user._id)) {
                return user.username;
            } else {
                return "";
            }
        });
        Session.set("people", names);
        $("#addFriendSearch").autocomplete({
            source: Session.get("people")
        }).change(change);
    });
};

Meteor.subscribe('allUsers');
