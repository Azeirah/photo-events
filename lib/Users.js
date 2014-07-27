Friend = {};
var STATUSSES = {};

STATUSSES.pending = "pending";
STATUSSES.friend = "friend";
STATUSSES.request = "request";

var hasFriend = function(userId, friendId) {
    var user = Meteor.users.findOne({
        _id: userId
    });
    return _.contains(user.profile.friends, friendId);
};

Meteor.methods({
    friendRequest: function(friendId) {
        if (!hasFriend(Meteor.userId(), friendId) && friendId !== Meteor.user()._id) {
            Meteor.users.update({
                _id: Meteor.userId()
            }, {
                $addToSet: {
                    "profile.friends": {
                        _id: friendId,
                        status: STATUSSES.pending
                    }
                }
            });
        } else {
            if (this.isSimulation) {
                FlashMessages.sendError("You're already friends with that person");
            }
        }
        if (!this.isSimulation) {
            if (!hasFriend(friendId, Meteor.userId()) && friendId !== Meteor.user()._id) {
                Meteor.users.update({
                    _id: friendId
                }, {
                    $addToSet: {
                        "profile.friends": friend = {
                            _id: Meteor.userId(),
                            status: STATUSSES.request
                        }
                    }
                });
            }
        }
    }
});

Friend.request = function(friendId) {
    Meteor.call('friendRequest', friendId);
};

Friend.accept = function(friendId) {
    // var friend = Meteor.users.findOne({_id: friendId});
};
