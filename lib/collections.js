var Users = new Meteor.Collection("Users");
var Events = new Meteor.Collection("Events");
var Media = new Meteor.Collection("Media");

// Namespace
var Event = {};

Event.create = function (organizerId, name, startDate, endDate) {
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
    Events.insert(event);
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
