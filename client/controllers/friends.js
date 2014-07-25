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

Template.friends.methods = function() {
    // TODO: This fetches *all* users, this will get messy when you have a few million users.
    Deps.autorun(function() {
        var users = Meteor.users.find({}).fetch();
        var names = users.map(function(user) {
            return user.username;
        });
        Session.set("people", names);
        $("#addFriendSearch").autocomplete({
            source: Session.get("people")
        }).change(change);
    });
};

Meteor.subscribe('allUsers');
