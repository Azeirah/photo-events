Friend = {};

Friend.add = function (friendId) {
    var self = {_id: Meteor.userId()};
    Meteor.users.update(self, {$addToSet: {friends: friendId}});
};