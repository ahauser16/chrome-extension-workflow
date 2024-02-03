var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
    const selectElement_USstatesReg = document.getElementById("USstatesReg");
    const selectElement_USstatesStamp = document.getElementById("USstatesStamp");

    states.forEach(state => {
        const optionReg = document.createElement("option");
        optionReg.value = state;
        optionReg.textContent = state;
        selectElement_USstatesReg.appendChild(optionReg);

        const optionStamp = document.createElement("option");
        optionStamp.value = state;
        optionStamp.textContent = state;
        selectElement_USstatesStamp.appendChild(optionStamp);
    });
}

document.addEventListener("DOMContentLoaded", populateStates);

function populateNewYorkCounties() {
    const counties = [
        "Albany", "Allegany", "Bronx", "Broome", "Cattaraugus", "Cayuga", "Chautauqua", "Chemung", "Chenango", "Clinton", "Columbia", "Cortland", "Delaware", "Dutchess", "Erie", "Essex", "Franklin", "Fulton", "Genesee", "Greene", "Hamilton", "Herkimer", "Jefferson", "Kings (Brooklyn)", "Lewis", "Livingston", "Madison", "Monroe", "Montgomery", "Nassau", "New York (Manhattan)", "Niagara", "Oneida", "Onondaga", "Ontario", "Orange", "Orleans", "Oswego", "Otsego", "Putnam", "Queens", "Rensselaer", "Richmond (Staten Island)", "Rockland", "St. Lawrence", "Saratoga", "Schenectady", "Schoharie", "Schuyler", "Seneca", "Steuben", "Suffolk", "Sullivan", "Tioga", "Tompkins", "Ulster", "Warren", "Washington", "Wayne", "Westchester", "Wyoming", "Yates"
    ];

    const selectElementReg = document.getElementById("newYorkCounties-reg");
    const selectElementFiled = document.getElementById("newYorkCounties-filed");
    const selectElementRegStamp = document.getElementById("newYorkCounties-regStamp");
    const selectElementFiledStamp = document.getElementById("newYorkCounties-regFiled");

    counties.forEach(county => {
        const optionElementReg = document.createElement("option");
        optionElementReg.value = county;
        optionElementReg.textContent = county;
        selectElementReg.appendChild(optionElementReg);

        const optionElementFiled = document.createElement("option");
        optionElementFiled.value = county;
        optionElementFiled.textContent = county;
        selectElementFiled.appendChild(optionElementFiled);

        const optionElementRegStamp = document.createElement("option");
        optionElementRegStamp.value = county;
        optionElementRegStamp.textContent = county;
        selectElementRegStamp.appendChild(optionElementRegStamp);

        const optionElementFiledStamp = document.createElement("option");
        optionElementFiledStamp.value = county;
        optionElementFiledStamp.textContent = county;
        selectElementFiledStamp.appendChild(optionElementFiledStamp);
    });
}

document.addEventListener("DOMContentLoaded", populateNewYorkCounties);

