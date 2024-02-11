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

// principal billing info related
const princCCnameField = document.querySelector('#name-on-credit-card');
const princCCnumField = document.querySelector('#credit-card-number');
const princCCexpField = document.querySelector('#credit-card-expiration');
const princCCcvvField = document.querySelector('#credit-card-cvv');
const princCCaddress1Field = document.querySelector('#princ-credit-card-address1');
const princCCaddress2Field = document.querySelector('#princ-credit-card-address2');
const princCCcityField = document.querySelector('#princ-credit-card-city');
const princCCstateField = document.querySelector('#princ-credit-card-state');
const princCCzipField = document.querySelector('#princ-credit-card-zip');

const princCCnameDisp = document.querySelector("#princCCnameDisp");
const princCCnumDisp = document.querySelector("#princCCnumDisp");
const princCCexpDisp = document.querySelector("#princCCexpDisp");
const princCCcvvDisp = document.querySelector("#princCCcvvDisp");
const princCCaddress1Disp = document.querySelector("#princCCaddress1Disp");
const princCCaddress2Disp = document.querySelector("#princCCaddress2Disp");
const princCCcityDisp = document.querySelector("#princCCcityDisp");
const princCCstateDisp = document.querySelector("#princCCstateDisp");
const princCCzipDisp = document.querySelector("#princCCzipDisp");

const princCCsubmitButton = document.querySelector('#princ-credit-card-saveBtn');
const princCCresetButton = document.querySelector('#princ-credit-card-resetBtn');

//principal scheduling info related
const princTimeZoneField = document.querySelector('#principal-time-zone-select');
const princPrefContactMethField = document.querySelector('#principal-pref-contact-method');
const princContactNotesPublicField = document.querySelector('#principal-contact-notes-public');

const princTimeZoneDisp = document.querySelector("#princTimeZoneDisp");
const princPrefContactMethDisp = document.querySelector("#princPrefContactMethDisp");
const princContactNotesPublicDisp = document.querySelector("#princContactNotesPublicDisp");

const princSchedSubmitButton = document.querySelector('#princ-scheduling-saveBtn');
const princSchedResetButton = document.querySelector('#princ-scheduling-resetBtn');

//principal's notary contacts related

const princNotarySearchSubmitButton = document.querySelector('#princ-notary-searchBtn');
const princNotarySaveButton = document.querySelector('#princ-scheduling-saveBtn');
const princNotarySearchResetButton = document.querySelector('#princ-scheduling-resetBtn');



////////////////
// Load any user data that may have previously been saved.
// loadChanges();
loadPrincContChanges();
loadPrincAddressChanges();
loadPrincCCchanges();
loadPrincSchedChanges();
// displayChanges();
displayPrincContactChanges();
displayPrincAddressChanges();
displayPrincCCchanges();
displayPrincSchedChanges();

princContactSubmitButton.addEventListener('click', savePrincContChanges);
princContactResetButton.addEventListener('click', resetPrincCont);

princAddressSubmitButton.addEventListener('click', savePrincAddressChanges);
princAddressResetButton.addEventListener('click', resetPrincAddress);

princCCsubmitButton.addEventListener('click', savePrincCCchanges);
princCCresetButton.addEventListener('click', resetPrincCC);

princSchedSubmitButton.addEventListener('click', savePrincSchedChanges);
princSchedResetButton.addEventListener('click', resetPrincSched);





async function savePrincContChanges() {
    console.log('Submit button clicked');

    // Get the current contact-user data from the form.
    const princFirstNameVal = princFirstNameField.value;
    const princLastNameVal = princLastNameField.value;
    const princEmailVal = princEmailField.value;
    const princPhoneVal = princPhoneField.value;

    // Check that all values are present.
    if (!princFirstNameVal || !princLastNameVal || !princEmailVal || !princPhoneVal) {
        showLoadMessages('Error: Missing required contact data');
        return;
    }

    // Save the data using the Chrome extension storage API.
    await storage.set({
        princContactData: {
            princFirstNameStorage: princFirstNameVal,
            princLastNameStorage: princLastNameVal,
            princEmailStorage: princEmailVal,
            princPhoneStorage: princPhoneVal,
        }
    });
    showLoadMessages_princContact('Settings saved');
    displayPrincContactChanges();
}

async function savePrincAddressChanges() {
    console.log('Submit button clicked');

    // Get the current contact-user data from the form.
    const princAddress1Val = princAddress1Field.value;
    const princAddress2Val = princAddress2Field.value;
    const princCityVal = princCityField.value;
    const princStateVal = princStateField.value;
    const princZipVal = princZipField.value;

    // Check that all values are present.
    if (!princAddress1Val || !princAddress2Val || !princCityVal || !princStateVal || !princZipVal) {
        showLoadMessages('Error: Missing required address data');
        return;
    }

    // Save the data using the Chrome extension storage API.
    await storage.set({
        princAddressData: {
            princAddressLine1Storage: princAddress1Val,
            princAddressLine2Storage: princAddress2Val,
            princCityStorage: princCityVal,
            princStateStorage: princStateVal,
            princZipStorage: princZipVal
        }
    });
    showLoadMessages_princAddress('Settings saved');
    displayPrincAddressChanges();
}

async function savePrincCCchanges() {
    console.log('Submit button clicked');

    // Get the current contact-user data from the form.
    const princCCnameVal = princCCnameField.value;
    const princCCnumVal = princCCnumField.value;
    const princCCexpVal = princCCexpField.value;
    const princCCcvvVal = princCCcvvField.value;
    const princCCaddress1Val = princCCaddress1Field.value;
    const princCCaddress2Val = princCCaddress2Field.value;
    const princCCcityVal = princCCcityField.value;
    const princCCstateVal = princCCstateField.value;
    const princCCzipVal = princCCzipField.value;


    // Check that all values are present.
    if (!princCCnameVal || !princCCnumVal || !princCCexpVal || !princCCcvvVal || !princCCaddress1Val || !princCCaddress2Val || !princCCcityVal || !princCCstateVal || !princCCzipVal) {
        showLoadMessages('Error: Missing required credit card data');
        return;
    }

    // Save the data using the Chrome extension storage API.
    await storage.set({
        princCreditCardData: {
            princCCnameStorage: princCCnameVal,
            princCCnumStorage: princCCnumVal,
            princCCexpStorage: princCCexpVal,
            princCCcvvStorage: princCCcvvVal,
            princCCaddress1Storage: princCCaddress1Val,
            princCCaddress2Storage: princCCaddress2Val,
            princCCcityStorage: princCCcityVal,
            princCCstateStorage: princCCstateVal,
            princCCzipStorage: princCCzipVal
        }
    });
    showLoadMessages_princCC('Settings saved');
    displayPrincCCchanges();
}

async function savePrincSchedChanges() {
    console.log('Submit button clicked');

    // Get the current contact-user data from the form.
    const princTimeZoneVal = princTimeZoneField.value;
    const princPrefContactMethVal = princPrefContactMethField.value;
    const princContactNotesPublicVal = princContactNotesPublicField.value;



    // Check that all values are present.
    if (!princTimeZoneVal || !princPrefContactMethVal || !princContactNotesPublicVal) {
        showLoadMessages('Error: Missing required scheduling data');
        return;
    }

    // Save the data using the Chrome extension storage API.
    await storage.set({
        princSchedData: {
            princTimeZoneStorage: princTimeZoneVal,
            princPrefContactMethStorage: princPrefContactMethVal,
            princContactNotesPublicStorage: princContactNotesPublicVal,
        }
    });
    showLoadMessages_princSched('Settings saved');
    displayPrincSchedChanges();
}











////////////////////
function loadPrincContChanges() {
    storage.get(['princContactData'], function (items) {
        userDataFromStorage = items['princContactData'];

        let messages = []; // Array to store the messages

        if (userDataFromStorage) {
            if (userDataFromStorage.princFirstNameStorage) {
                princFirstNameField.value = userDataFromStorage.princFirstNameStorage;
                messages.push('Loaded saved user first name.');
            }

            if (userDataFromStorage.princLastNameStorage) {
                princLastNameField.value = userDataFromStorage.princLastNameStorage;
                messages.push('Loaded saved user last name.');
            }

            if (userDataFromStorage.princEmailStorage) {
                princEmailField.value = userDataFromStorage.princEmailStorage;
                messages.push('Loaded saved user email.');
            }

            if (userDataFromStorage.princPhoneStorage) {
                princPhoneField.value = userDataFromStorage.princPhoneStorage;
                messages.push('Loaded saved user phone number.');
            }
        }
        showLoadMessages_princContact(messages.join(' '));
    });
}


function loadPrincAddressChanges() {
    storage.get(['princAddressData'], function (items) {
        userDataFromStorage = items['princAddressData'];

        let messages = []; // Array to store the messages

        if (userDataFromStorage) {
            if (userDataFromStorage.princAddressLine1Storage) {
                princAddress1Field.value = userDataFromStorage.princAddressLine1Storage;
                messages.push('Loaded saved user address (line 1).');
            }
            if (userDataFromStorage.princAddressLine2Storage) {
                princAddress2Field.value = userDataFromStorage.princAddressLine2Storage;
                messages.push('Loaded saved user address (line 2).');
            }
            if (userDataFromStorage.princCityStorage) {
                princCityField.value = userDataFromStorage.princCityStorage;
                messages.push('Loaded saved user City.');
            }
            if (userDataFromStorage.princStateStorage) {
                princStateField.value = userDataFromStorage.princStateStorage;
                messages.push('Loaded saved user State.');
            }
            if (userDataFromStorage.princZipStorage) {
                princZipField.value = userDataFromStorage.princZipStorage;
                messages.push('Loaded saved user zip code.');
            }
        }
        showLoadMessages_princAddress(messages.join(' '));
    });
}


function loadPrincCCchanges() {
    storage.get(['princCreditCardData'], function (items) {
        userDataFromStorage = items['princCreditCardData'];

        let messages = []; // Array to store the messages

        if (userDataFromStorage) {
            if (userDataFromStorage.princCCnameStorage) {
                princCCnameField.value = userDataFromStorage.princCCnameStorage;
                messages.push('Loaded saved user name as displayed on credit card.');
            }
            if (userDataFromStorage.princCCnumStorage) {
                princCCnumField.value = userDataFromStorage.princCCnumStorage;
                messages.push('Loaded saved user credit card number.');
            }
            if (userDataFromStorage.princCCexpStorage) {
                princCCexpField.value = userDataFromStorage.princCCexpStorage;
                messages.push('Loaded saved user credit card expiration date.');
            }
            if (userDataFromStorage.princCCcvvStorage) {
                princCCcvvField.value = userDataFromStorage.princCCcvvStorage;
                messages.push('Loaded saved user credit card CVV.');
            }
            if (userDataFromStorage.princCCaddress1Storage) {
                princCCaddress1Field.value = userDataFromStorage.princCCaddress1Storage;
                messages.push('Loaded saved user credit card address (line 1).');
            }
            if (userDataFromStorage.princCCaddress2Storage) {
                princCCaddress2Field.value = userDataFromStorage.princCCaddress2Storage;
                messages.push('Loaded saved user credit card address (line 2).');
            }
            if (userDataFromStorage.princCCcityStorage) {
                princCCcityField.value = userDataFromStorage.princCCcityStorage;
                messages.push('Loaded saved user credit card city.');
            }
            if (userDataFromStorage.princCCstateStorage) {
                princCCstateField.value = userDataFromStorage.princCCstateStorage;
                messages.push('Loaded saved user credit card state.');
            }
            if (userDataFromStorage.princCCzipStorage) {
                princCCzipField.value = userDataFromStorage.princCCzipStorage;
                messages.push('Loaded saved user credit card zip code.');
            }
        }
        showLoadMessages_princCC(messages.join(' '));
    });
}


function loadPrincSchedChanges() {
    storage.get(['princSchedData'], function (items) {
        userDataFromStorage = items['princSchedData'];

        let messages = []; // Array to store the messages

        if (userDataFromStorage) {
            if (userDataFromStorage.princTimeZoneStorage) {
                princTimeZoneField.value = userDataFromStorage.princTimeZoneStorage;
                messages.push('Loaded saved user time zone.');
            }
            if (userDataFromStorage.princPrefContactMethStorage) {
                princPrefContactMethField.value = userDataFromStorage.princPrefContactMethStorage;
                messages.push('Loaded saved user preferred contact method.');
            }
            if (userDataFromStorage.princContactNotesPublicStorage) {
                princContactNotesPublicField.value = userDataFromStorage.princContactNotesPublicStorage;
                messages.push('Loaded saved user credit card expiration date.');
            }
        }
        showLoadMessages_princSched(messages.join(' '));
    });
}









//////////////////////////////



async function resetPrincCont() {
    // Remove the saved values from storage.
    await storage.remove(['princContactData']);
    showLoadMessages_princContact('Reset stored principal contact data');
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

async function resetPrincAddress() {
    // Remove the saved values from storage.
    await storage.remove(['princAddressData']);
    showLoadMessages_princAddress('Reset stored principal address data');
    // Refresh the text field area.
    princAddress1Field.value = '';
    princAddress2Field.value = '';
    princCityField.value = '';
    princStateField.value = '';
    princZipField.value = '';

    // Refresh the sidebar area.
    princAddress1Disp.innerText = '';
    princAddress2Disp.innerText = '';
    princCityDisp.innerText = '';
    princStateDisp.innerText = '';
    princZipDisp.innerText = '';
}

async function resetPrincCC() {
    // Remove the saved values from storage.
    await storage.remove(['princCreditCardData']);
    showLoadMessages_princAddress('Reset stored principal credit card data');
    // Refresh the text field area.
    princCCnameField.value = '';
    princCCnumField.value = '';
    princCCexpField.value = '';
    princCCcvvField.value = '';
    princCCaddress1Field.value = '';
    princCCaddress2Field.value = '';
    princCCcityField.value = '';
    princCCstateField.value = '';
    princCCzipField.value = '';

    // Refresh the sidebar area.
    princCCnameDisp.innerText = '';
    princCCnumDisp.innerText = '';
    princCCexpDisp.innerText = '';
    princCCcvvDisp.innerText = '';
    princCCaddress1Disp.innerText = '';
    princCCaddress2Disp.innerText = '';
    princCCcityDisp.innerText = '';
    princCCstateDisp.innerText = '';
    princCCzipDisp.innerText = '';
}

async function resetPrincSched() {
    // Remove the saved values from storage.
    await storage.remove(['princSchedData']);
    showLoadMessages_princAddress('Reset stored principal scheduling data');
    // Refresh the text field area.
    princTimeZoneField.value = 'select';
    princPrefContactMethField.value = 'contact-method';
    princContactNotesPublicField.value = '';

    // selectElement.value = 'option-contact-method';

    // Refresh the sidebar area.
    princTimeZoneDisp.innerText = '';
    princPrefContactMethDisp.innerText = '';
    princContactNotesPublicDisp.innerText = '';

}




////////////////////////

async function displayPrincContactChanges() {
    const items = await storage.get(['princContactData']);
    userDataFromStorage = items['princContactData'];

    let messages = []; // Array to store the messages

    if (userDataFromStorage) {
        if (userDataFromStorage.princFirstNameStorage) {
            princFirstNameDisp.innerText = userDataFromStorage.princFirstNameStorage;
            // showMessage('Displayed saved user first name.');
            messages.push('Displayed saved user first name.');

        }
        if (userDataFromStorage.princLastNameStorage) {
            princLastNameDisp.innerText = userDataFromStorage.princLastNameStorage;
            // showMessage('Displayed saved user last name.');
            messages.push('Displayed saved user last name.');

        }
        if (userDataFromStorage.princEmailStorage) {
            princEmailDisp.innerText = userDataFromStorage.princEmailStorage;
            // showMessage('Displayed saved user email.');
            messages.push('Displayed saved user email.');

        }
        if (userDataFromStorage.princPhoneStorage) {
            princPhoneDisp.innerText = userDataFromStorage.princPhoneStorage;
            // showMessage('Displayed saved user phone number.');
            messages.push('Displayed saved user phone number.');

        }
    }
    showDisplayMessages_princContact(messages.join(' '));
}


async function displayPrincAddressChanges() {
    const items = await storage.get(['princAddressData']);
    userDataFromStorage = items['princAddressData'];

    let messages = []; // Array to store the messages

    if (userDataFromStorage) {
        if (userDataFromStorage.princAddressLine1Storage) {
            princAddress1Disp.innerText = userDataFromStorage.princAddressLine1Storage;
            // showMessage('Displayed saved user first name.');
            messages.push("Displayed saved user's address (line 1).");

        }
        if (userDataFromStorage.princAddressLine2Storage) {
            princAddress2Disp.innerText = userDataFromStorage.princAddressLine2Storage;
            // showMessage('Displayed saved user last name.');
            messages.push("Displayed saved user's address (line 2).");

        }
        if (userDataFromStorage.princCityStorage) {
            princCityDisp.innerText = userDataFromStorage.princCityStorage;
            // showMessage('Displayed saved user email.');
            messages.push("Displayed saved user's City.");

        }
        if (userDataFromStorage.princStateStorage) {
            princStateDisp.innerText = userDataFromStorage.princStateStorage;
            // showMessage('Displayed saved user phone number.');
            messages.push("Displayed saved user's State location.");
        }
        if (userDataFromStorage.princZipStorage) {
            princZipDisp.innerText = userDataFromStorage.princZipStorage;
            // showMessage('Displayed saved user phone number.');
            messages.push("Displayed saved user's zip code.");
        }
    }
    showDisplayMessages_princAddr(messages.join(' '));
}


async function displayPrincCCchanges() {
    const items = await storage.get(['princCreditCardData']);
    userDataFromStorage = items['princCreditCardData'];

    let messages = []; // Array to store the messages

    if (userDataFromStorage) {
        if (userDataFromStorage.princCCnameStorage) {
            princCCnameDisp.innerText = userDataFromStorage.princCCnameStorage;
            messages.push('Displayed saved user name as displayed on credit card.');
        }
        if (userDataFromStorage.princCCnumStorage) {
            princCCnumDisp.innerText = userDataFromStorage.princCCnumStorage;
            messages.push('Displayed saved user credit card number.');
        }
        if (userDataFromStorage.princCCexpStorage) {
            princCCexpDisp.innerText = userDataFromStorage.princCCexpStorage;
            messages.push('Displayed saved user credit card expiration date.');
        }
        if (userDataFromStorage.princCCcvvStorage) {
            princCCcvvDisp.innerText = userDataFromStorage.princCCcvvStorage;
            messages.push('Displayed saved user credit card CVV.');
        }
        if (userDataFromStorage.princCCaddress1Storage) {
            princCCaddress1Disp.innerText = userDataFromStorage.princCCaddress1Storage;
            messages.push('Displayed saved user credit card address (line 1).');
        }
        if (userDataFromStorage.princCCaddress2Storage) {
            princCCaddress2Disp.innerText = userDataFromStorage.princCCaddress2Storage;
            messages.push('Displayed saved user credit card address (line 2).');
        }
        if (userDataFromStorage.princCCcityStorage) {
            princCCcityDisp.innerText = userDataFromStorage.princCCcityStorage;
            messages.push('Displayed saved user credit card city.');
        }
        if (userDataFromStorage.princCCstateStorage) {
            princCCstateDisp.innerText = userDataFromStorage.princCCstateStorage;
            messages.push('Displayed saved user credit card state.');
        }
        if (userDataFromStorage.princCCzipStorage) {
            princCCzipDisp.innerText = userDataFromStorage.princCCzipStorage;
            messages.push('Displayed saved user credit card zip code.');
        }
        showDisplayMessages_princCC(messages.join(' '));
    }
}



async function displayPrincSchedChanges() {
    const items = await storage.get(['princSchedData']);
    userDataFromStorage = items['princSchedData'];

    let messages = []; // Array to store the messages

    if (userDataFromStorage) {
        if (userDataFromStorage.princTimeZoneStorage) {
            princTimeZoneDisp.innerText = userDataFromStorage.princTimeZoneStorage;
            messages.push('Displayed saved user time zone.');
        }
        if (userDataFromStorage.princPrefContactMethStorage) {
            princPrefContactMethDisp.innerText = userDataFromStorage.princPrefContactMethStorage;
            messages.push('Displayed saved user preferred contact method.');
        }
        if (userDataFromStorage.princContactNotesPublicStorage) {
            princContactNotesPublicDisp.innerText = userDataFromStorage.princContactNotesPublicStorage;
            messages.push('Displayed saved user scheduling public notes.');
        }

        showDisplayMessages_princSched(messages.join(' '));
    }
}







//////////////////////////////////

let loadMessageClearTimer_princContact;
function showLoadMessages_princContact(msg) {
    clearTimeout(loadMessageClearTimer_princContact);
    const message = document.querySelector('#primContMsg_princContact');
    message.innerText = msg;
    loadMessageClearTimer_princContact = setTimeout(function () {
        message.innerText = '';
    }, 3000);
}

let loadMessageClearTimer_princAddress;
function showLoadMessages_princAddress(msg) {
    clearTimeout(loadMessageClearTimer_princAddress);
    const message = document.querySelector('#primContMsg_princAddr');
    message.innerText = msg;
    loadMessageClearTimer_princAddress = setTimeout(function () {
        message.innerText = '';
    }, 3000);
}

let loadMessageClearTimer_princCC;
function showLoadMessages_princCC(msg) {
    clearTimeout(loadMessageClearTimer_princCC);
    const message = document.querySelector('#primContMsg_princCC');
    message.innerText = msg;
    loadMessageClearTimer_princCC = setTimeout(function () {
        message.innerText = '';
    }, 3000);
}

let loadMessageClearTimer_princSched;
function showLoadMessages_princSched(msg) {
    clearTimeout(loadMessageClearTimer_princSched);
    const message = document.querySelector('#primContMsg_princSched');
    message.innerText = msg;
    loadMessageClearTimer_princSched = setTimeout(function () {
        message.innerText = '';
    }, 3000);
}


//*//


let displayMessageClearTimer_princContact;
function showDisplayMessages_princContact(msg) {
    clearTimeout(displayMessageClearTimer_princContact);
    const message = document.querySelector('#sidebarMessage_princContact');
    message.innerText = msg;
    displayMessageClearTimer_princContact = setTimeout(function () {
        message.innerText = '';
    }, 3000);
}

let displayMessageClearTimer_princAddr;
function showDisplayMessages_princAddr(msg) {
    clearTimeout(displayMessageClearTimer_princAddr);
    const message = document.querySelector('#sidebarMessage_princAddr');
    message.innerText = msg;
    displayMessageClearTimer_princAddr = setTimeout(function () {
        message.innerText = '';
    }, 3000);
}

let displayMessageClearTimer_princCC;
function showDisplayMessages_princCC(msg) {
    clearTimeout(displayMessageClearTimer_princCC);
    const message = document.querySelector('#sidebarMessage_princCC');
    message.innerText = msg;
    displayMessageClearTimer_princCC = setTimeout(function () {
        message.innerText = '';
    }, 3000);
}

let displayMessageClearTimer_princSched;
function showDisplayMessages_princSched(msg) {
    clearTimeout(displayMessageClearTimer_princSched);
    const message = document.querySelector('#sidebarMessage_princSched');
    message.innerText = msg;
    displayMessageClearTimer_princSched = setTimeout(function () {
        message.innerText = '';
    }, 3000);
}

//////////////////////////////////////////










////////////////////////////////////
// Get the principal contact form element
const form__princContact = document.getElementById('principal-contact-form');

// Add event listener for form submission
form__princContact.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    // Get the form data
    const formData = new FormData(form__princContact);

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



// Get the principal address form element
const form__princAddress = document.getElementById('principal-address-form');

// Add event listener for form submission
form__princAddress.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    // Get the form data
    const formData = new FormData(form__princAddress);

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



// Get the principal credit card form element
const form__princCC = document.getElementById('principal-credit-card-form');

// Add event listener for form submission
form__princCC.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    // Get the form data
    const formData = new FormData(form__princCC);

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



// Get the principal credit card form element
const form__princSched = document.getElementById('principal-scheduling-form');

// Add event listener for form submission
form__princSched.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    // Get the form data
    const formData = new FormData(form__princSched);

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






////////////////////////////////////////
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



function fetchDataByCommissionHolderName() {
    const commissionHolderName = document.getElementById('commission-holder-name').value;
    const apiUrl = `https://data.ny.gov/resource/rwbv-mz6z.json?commission_holder_name=${encodeURIComponent(commissionHolderName)}`;

    console.log("Fetching data from API...");

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data retrieved successfully!");
            console.log("Retrieved " + data.length + " records from the dataset!");
            console.log(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

document.getElementById('commission-holder-search').addEventListener('click', fetchDataByCommissionHolderName);
