document.getElementById('same-address').addEventListener('change', function () {
    if (this.checked) {
        document.getElementById('card-name').value = document.getElementById('principal-first-name').value + ' ' + document.getElementById('principal-last-name').value;
        document.getElementById('billing-address1').value = document.getElementById('principal-address1').value;
        document.getElementById('billing-address2').value = document.getElementById('principal-address2').value;
        document.getElementById('billing-city').value = document.getElementById('principal-city').value;
        document.getElementById('billing-state').value = document.getElementById('principal-state').value;
        document.getElementById('billing-zip').value = document.getElementById('principal-zip').value;
    } else {
        document.getElementById('card-name').value = '';
        document.getElementById('billing-address1').value = '';
        document.getElementById('billing-address2').value = '';
        document.getElementById('billing-city').value = '';
        document.getElementById('billing-state').value = '';
        document.getElementById('billing-zip').value = '';
    }
});

var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

days.forEach(function (day) {
    document.getElementById('notesButton-' + day).addEventListener('click', function (event) {
        event.preventDefault();
        var container = document.getElementById('notesContainer-' + day);
        if (container.getElementsByTagName('textarea').length === 0) {
            var textarea = document.createElement('textarea');
            container.appendChild(textarea);
        }
    });
});

days.forEach(function(day) {
    document.getElementById('addTimeSlotButton-' + day).addEventListener('click', function(event) {
        event.preventDefault();
        addTimeSlot(day);
    });
});

function addTimeSlot(day) {
    console.log("addTimeSlot called with day: " + day);

    // Get the container for the time slots
    var container = document.getElementById(day.toLowerCase() + '-times');
    console.log("Container: ", container);


    // Create a new time slot
    var timeSlot = document.createElement('div');
    timeSlot.className = 'time-slot';

    // Create the start time input
    var startTime = document.createElement('input');
    startTime.type = 'time';
    startTime.className = 'time signup';
    startTime.id = day.toLowerCase() + '-start-time-' + (container.children.length + 1);

    // Create the end time input
    var endTime = document.createElement('input');
    endTime.type = 'time';
    endTime.className = 'time signup';
    endTime.id = day.toLowerCase() + '-end-time-' + (container.children.length + 1);

    // Add the inputs to the time slot
    timeSlot.appendChild(startTime);
    timeSlot.appendChild(endTime);

    // Add the time slot to the container
    container.appendChild(timeSlot);
    console.log("New time slot added to " + day + " times")

}