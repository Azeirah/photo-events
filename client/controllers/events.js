Template.evts.getAllEvents = function () {
    var allEvents = Events.find({}).fetch();
    return allEvents;
};

Meteor.subscribe("Events");