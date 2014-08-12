Events = new Meteor.Collection("Events");
Event = {};

Event.create = function (organizerId, name, startDate, endDate, callback) {
    var event = {
        name: name,
        startDate: startDate,
        endDate: endDate,
        organizer: organizerId,
        members: [],
        coverPhoto: "", // TODO: Create default photo or pick a photo from defaults
        photos: [],
        creationDate: +new Date()
    };
    Events.insert(event, callback);
};

Event.addMember = function (eventId, memberId) {
    var event = {_id: eventId};
    Events.update(event, {
        $push: {
            member: memberId
        }
    });
};

Event.removeMember = function (eventId, memberId) {
    var event = {_id: eventId};
    Events.update(event, {
        $pull: {
            member: memberId
        }
    });
};

Event.setCoverPhoto = function (eventId, photo) {
    var event = {_id: eventId};
    Events.update(event, {
        $set: {
            coverPhoto: photo
       }
    });
};


Events.allow({
    insert: function (userId, doc) {
        if (Meteor.user().emails[0].verified) {
            return true;
        }
        return false;
    }
});

if (Meteor.isClient) {
    console.log("events subscription");
    Meteor.subscribe('Events');
}
