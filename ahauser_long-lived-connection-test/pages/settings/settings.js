var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function addTimeSlot(day) {
    var container = document.getElementById(day.toLowerCase() + '-times');
    console.log('Container: ', container);
    var timeSlot = document.createElement('div');
    timeSlot.className = 'time-slot';
    var startTime = document.createElement('input');
    startTime.type = 'time';
    startTime.className = 'time signup';
    startTime.id = day.toLowerCase() + '-start-time-' + (container.getElementsByClassName('time-slot').length + 1);
    var endTime = document.createElement('input');
    endTime.type = 'time';
    endTime.className = 'time signup';
    endTime.id = day.toLowerCase() + '-end-time-' + (container.getElementsByClassName('time-slot').length + 1);
    timeSlot.appendChild(startTime);
    timeSlot.appendChild(endTime);
    container.appendChild(timeSlot);
    console.log('New time slot added to ' + day + ' times');
}

function addSchedulingFunctionality(formClassName) {
    days.forEach(function (day) {
        var availabilityDay = document.createElement('div');
        availabilityDay.className = 'availability-day';
        availabilityDay.id = day;

        var dayLabel = document.createElement('label');
        var dayCheckbox = document.createElement('input');
        dayCheckbox.type = 'checkbox';
        dayCheckbox.name = 'day';
        dayCheckbox.value = day;
        dayLabel.appendChild(dayCheckbox);
        dayLabel.appendChild(document.createTextNode(' ' + day));
        availabilityDay.appendChild(dayLabel);

        var timesContainer = document.createElement('div');
        timesContainer.id = day.toLowerCase() + '-times';
        availabilityDay.appendChild(timesContainer);

        var timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timesContainer.appendChild(timeSlot);

        ['start', 'end'].forEach(function (timeType) {
            var timeLabel = document.createElement('label');
            timeLabel.htmlFor = day.toLowerCase() + '-' + timeType + '-time-1';
            timeLabel.textContent = timeType.charAt(0).toUpperCase() + timeType.slice(1) + ' Time';
            timeSlot.appendChild(timeLabel);

            var timeInput = document.createElement('input');
            timeInput.type = 'time';
            timeInput.id = day.toLowerCase() + '-' + timeType + '-time-1';
            timeInput.className = 'time signup';
            timeSlot.appendChild(timeInput);
        });

        var addTimeSlotButton = document.createElement('button');
        addTimeSlotButton.id = 'addTimeSlotButton-' + day;
        addTimeSlotButton.textContent = 'Add Time Slot';
        addTimeSlotButton.addEventListener('click', function (event) {
            event.preventDefault();
            addTimeSlot(day);
        });
        availabilityDay.appendChild(addTimeSlotButton);

        var notesButton = document.createElement('button');
        notesButton.id = 'notesButton-' + day;
        notesButton.textContent = 'Notes';
        availabilityDay.appendChild(notesButton);

        var notesContainer = document.createElement('div');
        notesContainer.id = 'notesContainer-' + day;
        availabilityDay.appendChild(notesContainer);

        document.querySelector('.' + formClassName + ' .availability').appendChild(availabilityDay);
    });
}

// Call the function for each form
addSchedulingFunctionality('principal-signup-form');
addSchedulingFunctionality('notary-signup-form');

document.getElementById('same-as-principal-billing').addEventListener('change', function () {
    if (this.checked) {
        var principalBillingInputs = document.querySelectorAll('#principal-billing input');
        var notaryBillingInputs = document.querySelectorAll('#notary-billing input');

        principalBillingInputs.forEach(function (input, index) {
            if (input.type !== 'checkbox') { // Skip copying checkbox values
                notaryBillingInputs[index].value = input.value;
            }
        });
    }
});

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

document.getElementById('govt-id-type').addEventListener('change', function () {
    var backLabel = document.getElementById('back-label');
    var backInput = document.getElementById('govt-id-back');

    if (this.value === 'drivers-license') {
        backLabel.style.display = 'block';
        backInput.style.display = 'block';
    } else {
        backLabel.style.display = 'none';
        backInput.style.display = 'none';
    }
});

document.getElementById('same-as-principal-contact').addEventListener('change', function () {
    if (this.checked) {
        var principalContactInputs = document.querySelectorAll('#principal-contact input');
        var notaryContactInputs = document.querySelectorAll('#notary-contact input');

        principalContactInputs.forEach(function (input, index) {
            if (input.type !== 'checkbox') { // Skip copying checkbox values
                notaryContactInputs[index].value = input.value;
            }
        });
    }
});

const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
    "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
    "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming"
];

function populateStates() {
    const selectElement = document.getElementById("states");

    states.forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        selectElement.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", populateStates);

function populateNewYorkCounties() {
    const counties = [
        "Albany", "Allegany", "Bronx", "Broome", "Cattaraugus", "Cayuga", "Chautauqua", "Chemung", "Chenango", "Clinton", "Columbia", "Cortland", "Delaware", "Dutchess", "Erie", "Essex", "Franklin", "Fulton", "Genesee", "Greene", "Hamilton", "Herkimer", "Jefferson", "Kings (Brooklyn)", "Lewis", "Livingston", "Madison", "Monroe", "Montgomery", "Nassau", "New York (Manhattan)", "Niagara", "Oneida", "Onondaga", "Ontario", "Orange", "Orleans", "Oswego", "Otsego", "Putnam", "Queens", "Rensselaer", "Richmond (Staten Island)", "Rockland", "St. Lawrence", "Saratoga", "Schenectady", "Schoharie", "Schuyler", "Seneca", "Steuben", "Suffolk", "Sullivan", "Tioga", "Tompkins", "Ulster", "Warren", "Washington", "Wayne", "Westchester", "Wyoming", "Yates"
    ];

    const selectElementReg = document.getElementById("newYorkCounties-reg");
    const selectElementFiled = document.getElementById("newYorkCounties-filed");

    counties.forEach(county => {
        const optionElementReg = document.createElement("option");
        optionElementReg.value = county;
        optionElementReg.textContent = county;
        selectElementReg.appendChild(optionElementReg);

        const optionElementFiled = document.createElement("option");
        optionElementFiled.value = county;
        optionElementFiled.textContent = county;
        selectElementFiled.appendChild(optionElementFiled);
    });

    // Enable multiple selection
    selectElementReg.multiple = false;
    selectElementFiled.multiple = true;
}

document.addEventListener("DOMContentLoaded", populateNewYorkCounties);
