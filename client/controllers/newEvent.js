Template.newEvent.loadDateInputs = function () {
    Meteor.defer(function loadDateInputsDefer () {
        var twoHoursMillis = 7200000; // two hours in milliseconds
        $('.time').timepicker({
            'showDuration': true,
            'timeFormat': 'H:s'
        });
        $('.date').datepicker({
            'format': 'dd/mm/yyyy',
            'autoclose': true
        });
        var datepair = $('#newEventForm').datepair({
            defaultTimeDelta: twoHoursMillis
        });
    });
};

Template.newEvent.events({
    'click #newEvent': function (event, t) {
        var hour = 3600; // seconds
        var name = $(t.find("#eventName")).val();
        var startDate = $(t.find("#eventStartDate"));
        var endDate = $(t.find("#eventEndDate"));
        var startDateNum = +new Date(startDate.val());
        var endDateNum = +new Date(endDate.val());
        var validInput = true;
        console.dir(datepair);
        console.log(endDate.val());
        if (endDate.val().length !== 0 && startDate.val().length !== 0) {
            if ((endDateNum - startDateNum) < hour) {
                FlashMessages.sendError("Your event must last longer than one hour");
                validInput = false;
            }
        } else {
            FlashMessages.sendError("Your event must have a start date and end date.");
            validInput = false;
        }
        if (name.length === 0) {
            FlashMessages.sendError("Your event must have a name");
            validInput = false;
        }
        if (validInput) {
            Event.create(Meteor.userId(), name, startDateNum, endDateNum);
        }
    }
});
