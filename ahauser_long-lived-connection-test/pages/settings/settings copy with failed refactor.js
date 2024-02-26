// Store user data in the "local" storage area.
const storage = chrome.storage.local;

// Get at the DOM controls used in the sample.
// principal contact info related
const princFirstNameField = document.querySelector('#principal-first-name');
const princLastNameField = document.querySelector('#principal-last-name');
const princEmailField = document.querySelector('#principal-email');
const princPhoneField = document.querySelector('#principal-phone');

const princFirstNameDisp = document.querySelector("#princFirstNameDisp")
const princLastNameDisp = document.querySelector("#princLastNameDisp")
const princEmailDisp = document.querySelector("#princEmailDisp")
const princPhoneDisp = document.querySelector("#princPhoneDisp")

const princContactSubmitButton = document.querySelector('#princ-contact-saveBtn');
const princContactResetButton = document.querySelector('#princ-contact-resetBtn');

// principal address info related
const princAddress1Field = document.querySelector('#principal-address1');
const princAddress2Field = document.querySelector('#principal-address2');
const princCityField = document.querySelector('#principal-city');
const princStateField = document.querySelector('#principal-state');
const princZipField = document.querySelector('#principal-zip');

const princAddress1Disp = document.querySelector("#princAddress1Disp");
const princAddress2Disp = document.querySelector("#princAddress2Disp");
const princCityDisp = document.querySelector("#princCityDisp");
const princStateDisp = document.querySelector("#princStateDisp");
const princZipDisp = document.querySelector("#princZipDisp");

const princAddressSubmitButton = document.querySelector('#princ-address-saveBtn');
const princAddressResetButton = document.querySelector('#princ-address-resetBtn');

// Load any user data that may have previously been saved.
/////////////////////////////
loadChanges();
// let contactFieldInputMap = {
//     princFirstNameVal: princFirstNameField,
//     princLastNameVal: princLastNameField,
//     princEmailVal: princEmailField,
//     princPhoneVal: princPhoneField
// };

// loadChanges('principal', 'contact', contactFieldInputMap);

////////////////////////

////////////
displayChanges();
// let contactFieldDisplayMap = {
//     princFirstNameVal: princFirstNameDisp,
//     princLastNameVal: princLastNameDisp,
//     princEmailVal: princEmailDisp,
//     princPhoneVal: princPhoneDisp
// };
// displayChanges('principal', 'contact', contactFieldDisplayMap);
///////////

princContactSubmitButton.addEventListener('click', saveChanges);
// princContactSubmitButton.addEventListener('click', function () {
//     let contactInfo = {
//         princFirstNameVal: princFirstNameField.value,
//         princLastNameVal: princLastNameField.value,
//         princEmailVal: princEmailField.value,
//         princPhoneVal: princPhoneField.value,
//     };
//     console.log(contactInfo);

//     saveChanges('principal', 'contact', contactInfo)
// });
/////////////////



////////////////
princContactResetButton.addEventListener('click', reset);
// princContactResetButton.addEventListener('click', function () {
//     reset('principal', contactFieldInputMap, contactFieldDisplayMap);
// });
////////////////




/////////////////////////////
async function saveChanges() {
    console.log('Submit button clicked');

    // Get the current user data from the form.
    const princFirstNameVal = princFirstNameField.value;
    const princLastNameVal = princLastNameField.value;
    const princEmailVal = princEmailField.value;
    const princPhoneVal = princPhoneField.value;

    // Check that all values are present.
    if (!princFirstNameVal || !princLastNameVal || !princEmailVal || !princPhoneVal) {
        showLoadMessages('Error: Missing required fields');
        return;
    }

    // Save the data using the Chrome extension storage API.
    await storage.set({
        'user-data': {
            'principal-contact-info': {
                princFirstNameStorage: princFirstNameVal,
                princLastNameStorage: princLastNameVal,
                princEmailStorage: princEmailVal,
                princPhoneStorage: princPhoneVal
            }
        }
    });

    showLoadMessages('Settings saved');
    displayChanges();
}






// function getFromStorage(key) {
//     return new Promise((resolve, reject) => {
//         storage.get(key, result => {
//             if (chrome.runtime.lastError) {
//                 reject(chrome.runtime.lastError);
//             } else {
//                 resolve(result[key]);
//             }
//         });
//     });
// }

// function setToStorage(key, data) {
//     return new Promise((resolve, reject) => {
//         let obj = {};
//         obj[key] = data;
//         storage.set(obj, () => {
//             if (chrome.runtime.lastError) {
//                 reject(chrome.runtime.lastError);
//             } else {
//                 resolve();
//             }
//         });
//     });
// }

// async function saveChanges(data) {
//     console.log('Submit button clicked');
//     console.log('Data received:', data);

//     // Check that all values are present.
//     for (let key in data) {
//         if (!data[key]) {
//             console.log(`Missing value for ${key}`);
//             showLoadMessages('Error: Missing required fields');
//             return;
//         }
//     }

//     // Get the existing user data from storage.
//     let userData = await getFromStorage('user-data') || [];
//     console.log('Existing user data:', userData);

//     // Add the new data to the array.
//     userData.push(data);
//     console.log('Updated user data:', userData);

//     // Save the updated user data using the Chrome extension storage API.
//     console.log('Data to save:', userData);
//     await setToStorage('user-data', userData).catch(error => console.error('Error saving data:', error));
//     console.log('User data after save:', await getFromStorage('user-data'));

//     showLoadMessages('Settings saved');
//     displayChanges();
// }
//////////////////////////////



////////TREAD LIGHTLY/////////
function loadChanges() {
    storage.get(['user-data'], function (items) {
        const userData = items['user-data'];

        let messages = []; // Array to store the messages

        if (userData && userData['principal-contact-info']) {
            const principalContactInfo = userData['principal-contact-info'];
            if (principalContactInfo.princFirstNameStorage) {
                princFirstNameField.value = principalContactInfo.princFirstNameStorage;
                messages.push('Loaded saved user first name.');
            }

            if (principalContactInfo.princLastNameStorage) {
                princLastNameField.value = principalContactInfo.princLastNameStorage;
                messages.push('Loaded saved user last name.');
            }

            if (principalContactInfo.princEmailStorage) {
                princEmailField.value = principalContactInfo.princEmailStorage;
                messages.push('Loaded saved user email.');

            }
            if (principalContactInfo.princPhoneStorage) {
                princPhoneField.value = principalContactInfo.princPhoneStorage;
                messages.push('Loaded saved user phone number.');

            }
        }
        showLoadMessages(messages.join(' '));
    });
}

// function loadChanges(userCategory, fieldMap) {
//     storage.get(['user-data'], function (items) {
//         const userData = items['user-data'];

//         let messages = []; // Array to store the messages

//         if (userData && userData[userCategory]) {
//             const data = userData[userCategory];
//             for (let key in fieldMap) {
//                 if (data[key]) {
//                     fieldMap[key].value = data[key];
//                     messages.push(`Loaded saved user ${key}.`);
//                 }
//             }
//         }
//         showLoadMessages(messages.join(' '));
//     });
// }


/////////////////////////
async function reset() {
    // Remove the saved values from storage.
    await storage.remove(['user-data']);
    showLoadMessages('Reset stored data');
    // Refresh the text field area.
    princFirstNameField.value = '';
    princLastNameField.value = '';
    princEmailField.value = '';
    princPhoneField.value = '';

    // Refresh the sidebar area.
    princFirstNameDisp.innerText = '';
    princLastNameDisp.innerText = '';
    princEmailDisp.innerText = '';
    princPhoneDisp.innerText = '';
}

// async function reset(userCategory, fieldInputMap, fieldDisplayMap) {
//     // Remove the saved values from storage.
//     await storage.remove(['user-data']);
//     showLoadMessages('Reset stored data');

//     // Refresh the text field area.
//     for (let key in fieldInputMap) {
//         fieldInputMap[key].value = '';
//     }

//     // Refresh the sidebar area.
//     for (let key in fieldDisplayMap) {
//         fieldDisplayMap[key].innerText = '';
//     }
// }
/////////////////////////



/////////////////////////
// async function displayChanges(userCategory, fieldMap) {
//     const items = await storage.get(['user-data']);
//     const userData = items['user-data'];

//     let messages = []; // Array to store the messages

//     if (userData && userData[userCategory]) {
//         const data = userData[userCategory];
//         for (let key in fieldMap) {
//             if (data[key]) {
//                 fieldMap[key].innerText = data[key];
//                 messages.push(`Displayed saved user ${key}.`);
//             }
//         }
//     }
//     showDisplayMessages(messages.join(' '));
// }

async function displayChanges() {
    const items = await storage.get(['user-data']);
    const userData = items['user-data'];

    let messages = []; // Array to store the messages


    if (userData && userData['principal-contact-info']) {
        const principalContactInfo = userData['principal-contact-info'];
        if (principalContactInfo.princFirstNameStorage) {
            princFirstNameDisp.innerText = principalContactInfo.princFirstNameStorage;
            // showMessage('Displayed saved user first name.');
            messages.push('Displayed saved user first name.');

        }
        if (principalContactInfo.princLastNameStorage) {
            princLastNameDisp.innerText = principalContactInfo.princLastNameStorage;
            // showMessage('Displayed saved user last name.');
            messages.push('Displayed saved user last name.');

        }
        if (principalContactInfo.princEmailStorage) {
            princEmailDisp.innerText = principalContactInfo.princEmailStorage;
            // showMessage('Displayed saved user email.');
            messages.push('Displayed saved user email.');

        }
        if (principalContactInfo.princPhoneStorage) {
            princPhoneDisp.innerText = principalContactInfo.princPhoneStorage;
            // showMessage('Displayed saved user phone number.');
            messages.push('Displayed saved user phone number.');

        }
    }
    showDisplayMessages(messages.join(' '));
}
/////////////////////////////




let loadMessageClearTimer;
function showLoadMessages(msg) {
    clearTimeout(loadMessageClearTimer);
    const message = document.querySelector('#primContMsg_princContact');
    message.innerText = msg;
    loadMessageClearTimer = setTimeout(function () {
        message.innerText = '';
    }, 3000);
}

let displayMessageClearTimer;
function showDisplayMessages(msg) {
    clearTimeout(displayMessageClearTimer);
    const message = document.querySelector('#sidebarMessage_princContact');
    message.innerText = msg;
    displayMessageClearTimer = setTimeout(function () {
        message.innerText = '';
    }, 3000);
}









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

// document.getElementById('same-as-principal-contact').addEventListener('change', function () {
//     if (this.checked) {
//         document.getElementById('principal-first-name').value = document.getElementById('notary-first-name').value;
//         document.getElementById('principal-last-name').value = document.getElementById('notary-last-name').value;
//         document.getElementById('principal-email').value = document.getElementById('notary-email').value;
//         document.getElementById('principal-phone').value = document.getElementById('principal-phone').value;
//     } else {
//         document.getElementById('notary-first-name').value = '';
//         document.getElementById('notary-last-name').value = '';
//         document.getElementById('notary-email').value = '';
//         document.getElementById('principal-phone').value = '';
//     }
// });

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

populateStates();
populateNewYorkCounties();

// Get the form element
const form = document.getElementById('principal-contact-form');

// Add event listener for form submission
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    // Get the form data
    const formData = new FormData(form);

    // Convert form data to JSON object
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    // Send message to service worker
    navigator.serviceWorker.controller.postMessage({
        type: 'storeFormData',
        data: data
    });
});





//////////////////////////////////////////
function saveFormData(formId) {
    console.log(`${formId} submit button clicked`);

    const form = document.getElementById(formId);
    const dataToSave = {};
    let isEmptyFieldPresent = false;

    for (let element of form.getElementsByClassName('formInput')) {
        const key = element.id;
        const value = element.value;

        if (element.type === 'file') {
            // Handle file inputs
            // ...
        } else if (element.tagName === 'SELECT' && element.multiple) {
            // Handle select inputs with "multiple" attribute
            const selectedOptions = Array.from(element.selectedOptions).map(option => option.value);
            if (selectedOptions.length === 0) {
                isEmptyFieldPresent = true;
                break;
            }
            dataToSave[key] = selectedOptions;
        } else {
            // Handle other input types
            if (!value) {
                isEmptyFieldPresent = true;
                break;
            }
            dataToSave[key] = value;
        }
    }

    if (isEmptyFieldPresent) {
        showLoadMessages('Error: Missing required contact data');
        return;
    }

    const storageKey = `${formId.replace("-form", "-storage")}`;
    storage.set({ [storageKey]: dataToSave })
        .then(() => {
            showLoadMessages_princContact('Settings saved');
            displayFormData(formId);
        })
        .catch((error) => {
            console.error(error);
            showLoadMessages_princContact('Error saving settings');
        });
}