Friend = {};
Friend.STATUSES = {};

Friend.STATUSES.pending = "pending";
Friend.STATUSES.friend = "friend";
Friend.STATUSES.request = "request";

/**
 * Returns if a user (specified by userId) has a friend (specified by another userId)
 */
var hasFriend = function(userId, friendId) {
    var user = Meteor.users.findOne({
        _id: userId
    });
    return _.contains(user.profile.friends, friendId);
};

/**
 * Returns the friend if the friend exists, otherwise returns false
 */
var findFriendById = function (userId, friendId) {
    if (hasFriend(userId, friendId)) {
        return _.find(Meteor.users.findOne({_id: userId}).profile.friends, function (friend) {
            return friend._id === friendId;
        });
    } else {
        return false;
    }
};

/**
 * Takes a userId and returns if the user is the logged in user or not.
 */
var isLoggedInUser = function (userId) {
    return userId === Meteor.user()._id;
};

/**
 * Returns a boolean
 * Takes two users and expected friend statuses, these users have to be friends.
 * The status associated with the users is the status that you expect him to have
 * the objects are structured as following:
 * {
 *   _id: "340usdfh0932ujweh032ur", // a user Id
 *   status: "friend" // one of three Friend.STATUSES statuses.
 * }
 */
var validateUserRelations = function (user1Relation, user2Relation) {
    var user1 = Meteor.users.findOne({_id: user1Relation._id});
    var user2 = Meteor.users.findOne({_id: user2Relation._id});
    var user1Friend = _.find(user1.profile.friends, function (friend) {
        return friend._id === user2._id;
    });
    var user2Friend = _.find(user2.profile.friends, function (friend) {
        return friend._id === user1._id;
    });

    return user1Friend.status === user1Relation.status && user2Friend.status === user2Relation.status;
};

/**
 * Updates two users' friends status.
 * The objects are structured as following:
 * {
 *   _id: "340usdfh0932ujweh032ur", // a user Id
 *   status: "friend" // one of three Friend.STATUSES statuses.
 * }
 */
var updateFriendStatus = function (user1Status, user2Status) {
    // these two statements can probably be combined somehow
    // my mongo-fu isn't good enough though.
    Meteor.users.update({
            _id: user1Status._id,
            "profile.friends._id": user2Status._id
        }, {
            $set: {"profile.friends.$.status": Friend.STATUSES.friend}
        }
    );
    Meteor.users.update({
            _id: user2Status._id,
            "profile.friends._id": user1Status._id
        }, {
            $set: {"profile.friends.$.status": Friend.STATUSES.friend}
        }
    );
};

/* These friend methods work in a similar way
 - Validate server-side that the relation between the two people is correct (by comparing STATUSES)
    If invalid, do nothing, since then it's either a bug or a hack, so it has to be fixed
 - Update STATUSES of both people
*/
Meteor.methods({
    /**
     * Sends a friend request to a person by friend id
     */
    friendRequest: function(friendId) {
        // update self
        if (!hasFriend(this.userId, friendId) && !isLoggedInUser(friendId)) {
            Meteor.users.update(
                {_id: this.userId},
                {$addToSet: {"profile.friends": {_id: friendId, status: Friend.STATUSES.pending}}}
            );
        } else if (this.isSimulation) {
            FlashMessages.sendError("You're already friends with that person");
        }
        // update friend
        if (!hasFriend(friendId, this.userId) && !isLoggedInUser(friendId)) {
            Meteor.users.update(
                {_id: friendId},
                {$addToSet: {"profile.friends": {_id: this.userId, status: Friend.STATUSES.request}}}
            );
        }
    },
    confirmFriendRequest: function (friendId) {
        // var updateFriendStatus = function (userId, friendId) {
        //     Meteor.users.update(
        //         {_id: this.userId, friends: {$elemMatch: {_id: friendId}}},
        //         {$set: {"profile.friends.$._id": Friend.STATUSES.friend}}
        //     );
        // };
        var user1Relation = {
            _id: this.userId,
            status: Friend.STATUSES.request
        };
        var user2Relation = {
            _id: friendId,
            status: Friend.STATUSES.pending
        };
        if (validateUserRelations(user1Relation, user2Relation)) {
            var user1Update = {
                _id: this.userId,
                status: Friend.STATUSES.friend
            };
            var user2Update = {
                _id: friendId,
                status: Friend.STATUSES.friend
            };
            updateFriendStatus(user1Update, user2Update);
        }
    }
});

/**
 * small wrapper method for the Meteor friendRequest method
 */
Friend.request = function(friendId) {
    Meteor.call('friendRequest', friendId);
};

/**
 * small wrapper method for the Meteor confirmFriendRequest method
 */
Friend.confirmFriendRequest = function(friendId) {
    Meteor.call('confirmFriendRequest', friendId);
};

// Friend.confirmFriendRequest(Meteor.users.findOne({username: "brekelmans"})._id);
