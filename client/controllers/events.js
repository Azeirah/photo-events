Template.evts.getAllEvents = function () {
    var allEvents = Events.find({}).fetch();
    return allEvents;
};

Template.evts.noEvents = function () {
    return Events.find({}).count() === 0;
};

Meteor.subscribe("Events");
