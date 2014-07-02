function parseTime(timeStr, dt) {
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
}

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
        datepair = $('#newEventForm');
        datepair.datepair({
            defaultTimeDelta: twoHoursMillis
        });
    });
};

Template.newEvent.events({
    'click #newEvent': function (event, t) {
        var hour = 60 * 60 * 1000; // milliseconds
        var name = $(t.find("#eventName")).val();
        var startDate = $(t.find(".date.start"));
        var endDate = $(t.find(".date.end"));
        var startTime = $(t.find('.time.start'));
        var endTime = $(t.find('.time.end'));
        var startDateNum = +new Date(startDate.val());
        var endDateNum = +new Date(endDate.val());
        var startTimeNum = +new Date(parseTime(startTime.val()));
        var endTimeNum = +new Date(parseTime(endTime.val()));
        var duration;
        var validInput = true;

        if (endDate.val().length !== 0 && startDate.val().length !== 0 && startTime.val().length !== 0 && endTime.val().length !== 0) {
            duration = (endDateNum + endTimeNum) - (startDateNum + startTimeNum);
            if (duration < hour) {
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