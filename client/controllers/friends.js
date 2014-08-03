/**
 * Takes a username, and returns if it exists
 */
var validateUsername = function(username) {
    return Meteor.users.find({
        "username": username
    }).fetch().length === 1;
};

/**
 * Takes a meteor.users.user object
 * returns if the user would be considered a valid friend
 * This is true if the user is not the logged in user and if he's not already a friend
 */
var isValidFriend = function(user) {
    var selfUser = Meteor.user();
    var friends = _.pluck(selfUser.profile.friends, "_id");
    return selfUser.username !== user.username && !_.contains(friends, user._id);
};

/**
 * Callback for the friend search field, will show and hide the add friend button if the
 * username input is considered valid
 */
var change = function() {
    var username = $("#addFriendSearch").val();
    if (validateUsername(username)) {
        var friend = Meteor.users.findOne({
            "username": username
        });
        if (isValidFriend(friend)) {
            $(".addFriendButton").show();
        }
    } else {
        $(".addFriendButton").hide();
    }
};

Template.friends.events({
    'keyup #addFriendSearch': change,
    /**
     * handler for the addfriendbutton click event
     * sends a friend request to the selected user if validation succeeds
     */
    'click .addFriendButton': function() {
        var username = $("#addFriendSearch").val();
        if (validateUsername(username)) {
            var user = Meteor.users.findOne({
                username: username
            });
            Friend.request(user._id);
            $("#addFriendSearch").reset();
        }
    }
});

/**
 * Returns if the logged in user has friends or not
 */
Template.friends.hasFriends = function() {
    return Meteor.user().profile.friends.length > 0;
};

/**
 * This loads in usernames into the autocomplete field. The function runs on startup.
 * This is a hack, as it's being called as a template method in friends.html. See it as an initialisation script.
 */
Template.friends.methods = function() {
    // TODO: This fetches *all* users, this will get messy when you have a few million users.
    Deps.autorun(function() {
        var users = Meteor.users.find({}).fetch();
        var names = users.map(function(user) {
            if (isValidFriend(user)) {
                return user.username;
            } else {
                return "";
            }
        });
        $("#addFriendSearch").autocomplete({
            source: names
        }).change(change);

        Meteor.subscribe("friends");
        Meteor.subscribe('allUsers');
    });
};

/**
 * Takes a status and returns if the status is a pending friend request
 */
Template.friend.pending = function (status) {
    return status === Friend.STATUSES.pending;
};

/**
 * Takes a status and returns if the status is a confirmed friend
 */
Template.friend.areFriends = function (status) {
    return status === Friend.STATUSES.friend;
};

/**
 * Takes a status and returns if the status is a friend request
 */
Template.friend.request = function (status) {
    return status === Friend.STATUSES.request;
};

