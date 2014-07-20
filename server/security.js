Meteor.users.allow({
    update: function (_id) {
        return Meteor.userId() === _id;
    }
});