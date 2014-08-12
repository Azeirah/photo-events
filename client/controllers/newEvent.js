var parseTime = function (timeStr, dt) {
    if (!dt) {
        dt = new Date();
    }

    var time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/i);
    if (!time) {
        return NaN;
    }
    var hours = parseInt(time[1], 10);
    if (hours == 12 && !time[3]) {
        hours = 0;
    }
    else {
        hours += (hours < 12 && time[3]) ? 12 : 0;
    }

    dt.setHours(hours);
    dt.setMinutes(parseInt(time[2], 10) || 0);
    dt.setSeconds(0, 0);
    return dt;
};

Template.newEvent.loadDateInputs = function () {
    Meteor.defer(function loadDateInputsDefer () {
        var twoHoursMillis = 7200000; // two hours in milliseconds
        $('.date').datepicker({
            'format': 'dd/mm/yyyy',
            'autoclose': true
        });
    });
};

Template.newEvent.events({
    'click #newEvent': function (event, t) {
        var hour = 60 * 60 * 1000; // milliseconds
        var name = $(t.find("#eventName")).val();
        var startDate = $(t.find(".date.start"));
        var endDate = $(t.find(".date.end"));
        var startDateNum = +new Date(startDate.val());
        var endDateNum = +new Date(endDate.val());
        var duration;
        var validInput = true;

        if (endDate.val().length !== 0 && startDate.val().length !== 0) {
            duration = endDateNum - startDateNum;
            if (duration < hour * 24) {
                FlashMessages.sendError("Your event must last at least one day");
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
            Event.create(Meteor.userId(), name, startDateNum, endDateNum, function (error) {
                if (error) {
                    FlashMessages.sendError("You must verify your email");
                } else {
                    FlashMessages.sendInfo("Event succesfully created");
                    // Router.go('eventCreated');
                }
            });
        }
    }
});
