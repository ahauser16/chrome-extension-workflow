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

// const princContactSubmitButton = document.querySelector('#princ-contact-saveBtn');
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
const princElectronicNotarySearchSubmitButton = document.querySelector('#princ-elect-notary-searchBtn');
const princNotarySaveButton = document.querySelector('#princ-scheduling-saveBtn');
const princNotarySearchResetButton = document.querySelector('#saved-notaries-resetBtn');

const commission_holder_name_1 = document.querySelector('#commission_holder_name_1');
const commission_number_uid_1 = document.querySelector('#commission_number_uid_1');
const commissioned_county_1 = document.querySelector('#commissioned_county_1');
const commission_type_traditional_or_electronic_1 = document.querySelector('#commission_type_traditional_or_electronic_1');
const term_issue_date_1 = document.querySelector('#term_issue_date_1');
const term_expiration_date_1 = document.querySelector('#term_expiration_date_1');

const commission_holder_name_2 = document.querySelector('#commission_holder_name_2');
const commission_number_uid_2 = document.querySelector('#commission_number_uid_2');
const commissioned_county_2 = document.querySelector('#commissioned_county_2');
const commission_type_traditional_or_electronic_2 = document.querySelector('#commission_type_traditional_or_electronic_2');
const term_issue_date_2 = document.querySelector('#term_issue_date_2');
const term_expiration_date_2 = document.querySelector('#term_expiration_date_2');

const commission_holder_name_3 = document.querySelector('#commission_holder_name_3');
const commission_number_uid_3 = document.querySelector('#commission_number_uid_3');
const commissioned_county_3 = document.querySelector('#commissioned_county_3');
const commission_type_traditional_or_electronic_3 = document.querySelector('#commission_type_traditional_or_electronic_3');
const term_issue_date_3 = document.querySelector('#term_issue_date_3');
const term_expiration_date_3 = document.querySelector('#term_expiration_date_3');

const commission_holder_name_4 = document.querySelector('#commission_holder_name_4');
const commission_number_uid_4 = document.querySelector('#commission_number_uid_4');
const commissioned_county_4 = document.querySelector('#commissioned_county_4');
const commission_type_traditional_or_electronic_4 = document.querySelector('#commission_type_traditional_or_electronic_4');
const term_issue_date_4 = document.querySelector('#term_issue_date_4');
const term_expiration_date_4 = document.querySelector('#term_expiration_date_4');

const commission_holder_name_5 = document.querySelector('#commission_holder_name_5');
const commission_number_uid_5 = document.querySelector('#commission_number_uid_5');
const commissioned_county_5 = document.querySelector('#commissioned_county_5');
const commission_type_traditional_or_electronic_5 = document.querySelector('#commission_type_traditional_or_electronic_5');
const term_issue_date_5 = document.querySelector('#term_issue_date_5');
const term_expiration_date_5 = document.querySelector('#term_expiration_date_5');

const commission_holder_name_6 = document.querySelector('#commission_holder_name_6');
const commission_number_uid_6 = document.querySelector('#commission_number_uid_6');
const commissioned_county_6 = document.querySelector('#commissioned_county_6');
const commission_type_traditional_or_electronic_6 = document.querySelector('#commission_type_traditional_or_electronic_6');
const term_issue_date_6 = document.querySelector('#term_issue_date_6');
const term_expiration_date_6 = document.querySelector('#term_expiration_date_6');

const commission_holder_name_7 = document.querySelector('#commission_holder_name_7');
const commission_number_uid_7 = document.querySelector('#commission_number_uid_7');
const commissioned_county_7 = document.querySelector('#commissioned_county_7');
const commission_type_traditional_or_electronic_7 = document.querySelector('#commission_type_traditional_or_electronic_7');
const term_issue_date_7 = document.querySelector('#term_issue_date_7');
const term_expiration_date_7 = document.querySelector('#term_expiration_date_7');

const commission_holder_name_8 = document.querySelector('#commission_holder_name_8');
const commission_number_uid_8 = document.querySelector('#commission_number_uid_8');
const commissioned_county_8 = document.querySelector('#commissioned_county_8');
const commission_type_traditional_or_electronic_8 = document.querySelector('#commission_type_traditional_or_electronic_8');
const term_issue_date_8 = document.querySelector('#term_issue_date_8');
const term_expiration_date_8 = document.querySelector('#term_expiration_date_8');

const commission_holder_name_9 = document.querySelector('#commission_holder_name_9');
const commission_number_uid_9 = document.querySelector('#commission_number_uid_9');
const commissioned_county_9 = document.querySelector('#commissioned_county_9');
const commission_type_traditional_or_electronic_9 = document.querySelector('#commission_type_traditional_or_electronic_9');
const term_issue_date_9 = document.querySelector('#term_issue_date_9');
const term_expiration_date_9 = document.querySelector('#term_expiration_date_9');

const commission_holder_name_10 = document.querySelector('#commission_holder_name_10');
const commission_number_uid_10 = document.querySelector('#commission_number_uid_10');
const commissioned_county_10 = document.querySelector('#commissioned_county_10');
const commission_type_traditional_or_electronic_10 = document.querySelector('#commission_type_traditional_or_electronic_10');
const term_issue_date_10 = document.querySelector('#term_issue_date_10');
const term_expiration_date_10 = document.querySelector('#term_expiration_date_10');

const princeNotarySearchResultRow1SaveBtn = document.querySelector('#princeNotarySearchResultRow1saveBtn');
const princeNotarySearchResultRow2SaveBtn = document.querySelector('#princeNotarySearchResultRow2saveBtn');
const princeNotarySearchResultRow3SaveBtn = document.querySelector('#princeNotarySearchResultRow3saveBtn');
const princeNotarySearchResultRow4SaveBtn = document.querySelector('#princeNotarySearchResultRow4saveBtn');
const princeNotarySearchResultRow5SaveBtn = document.querySelector('#princeNotarySearchResultRow5saveBtn');
const princeNotarySearchResultRow6SaveBtn = document.querySelector('#princeNotarySearchResultRow6saveBtn');
const princeNotarySearchResultRow7SaveBtn = document.querySelector('#princeNotarySearchResultRow7saveBtn');
const princeNotarySearchResultRow8SaveBtn = document.querySelector('#princeNotarySearchResultRow8saveBtn');
const princeNotarySearchResultRow9SaveBtn = document.querySelector('#princeNotarySearchResultRow9saveBtn');
const princeNotarySearchResultRow10SaveBtn = document.querySelector('#princeNotarySearchResultRow10saveBtn');



////////////////
// Load any user data that may have previously been saved.
// loadChanges();
loadPrincContChanges();
loadPrincAddressChanges();
loadPrincCCchanges();
loadPrincSchedChanges();
// displayChanges();

document.addEventListener('DOMContentLoaded', () => {
    displayFormData('principal-contact-form');
    // Add more form IDs as needed
});

// displayPrincContactChanges();
displayPrincAddressChanges();
displayPrincCCchanges();
displayPrincSchedChanges();

// princContactSubmitButton.addEventListener('click', savePrincContChanges);
princContactResetButton.addEventListener('click', resetPrincCont);

princAddressSubmitButton.addEventListener('click', savePrincAddressChanges);
princAddressResetButton.addEventListener('click', resetPrincAddress);

princCCsubmitButton.addEventListener('click', savePrincCCchanges);
princCCresetButton.addEventListener('click', resetPrincCC);

princSchedSubmitButton.addEventListener('click', savePrincSchedChanges);
princSchedResetButton.addEventListener('click', resetPrincSched);


princElectronicNotarySearchSubmitButton.addEventListener('click', fetchElectronicNotaryList);



// princeNotarySearchResultRow1SaveBtn.addEventListener('click', function () {
//     console.log("Clicked on princeNotarySearchResultRow1SaveBtn");
//     saveNotaryToContactList();
// });

// princeNotarySearchResultRow2SaveBtn.addEventListener('click', function () {
//     console.log("Clicked on princeNotarySearchResultRow2SaveBtn");
//     saveNotaryToContactList();
// });
// princeNotarySearchResultRow3SaveBtn.addEventListener('click', function () {
//     console.log("Clicked on princeNotarySearchResultRow3SaveBtn");
//     saveNotaryToContactList();
// });
// princeNotarySearchResultRow4SaveBtn.addEventListener('click', function () {
//     console.log("Clicked on princeNotarySearchResultRow4SaveBtn");
//     saveNotaryToContactList();
// });
// princeNotarySearchResultRow5SaveBtn.addEventListener('click', function () {
//     console.log("Clicked on princeNotarySearchResultRow5SaveBtn");
//     saveNotaryToContactList();
// });
// princeNotarySearchResultRow6SaveBtn.addEventListener('click', function () {
//     console.log("Clicked on princeNotarySearchResultRow6SaveBtn");
//     saveNotaryToContactList();
// });
// princeNotarySearchResultRow7SaveBtn.addEventListener('click', function () {
//     console.log("Clicked on princeNotarySearchResultRow7SaveBtn");
//     saveNotaryToContactList();
// });
// princeNotarySearchResultRow8SaveBtn.addEventListener('click', function () {
//     console.log("Clicked on princeNotarySearchResultRow8SaveBtn");
//     saveNotaryToContactList();
// });
// princeNotarySearchResultRow9SaveBtn.addEventListener('click', function () {
//     console.log("Clicked on princeNotarySearchResultRow9SaveBtn");
//     saveNotaryToContactList();
// });
// princeNotarySearchResultRow10SaveBtn.addEventListener('click', function () {
//     console.log("Clicked on princeNotarySearchResultRow10SaveBtn");
//     saveNotaryToContactList();
// });

const principalContactForm = document.getElementById('principal-contact-form');
const submitButton = document.querySelector('#princ-contact-saveBtn');

submitButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    saveFormData('principal-contact-form');
});

function saveFormData(formId) {
    console.log(`${formId} submit button clicked`);

    const form = document.getElementById(formId);
    const dataToSave = {};
    let isEmptyFieldPresent = false;

    // Iterate over each input field in the form with the class "formInput"
    for (let element of form.getElementsByClassName('formInput')) {
        if (element.tagName === 'INPUT') { // Ensure we're only dealing with <input> elements
            const key = element.id; // Use the input's id as the key
            const value = element.value; // Get the input's current value

            // Check if the input field is empty
            if (!value) {
                isEmptyFieldPresent = true;
                break;
            }

            // Assign the value to the corresponding key in the dataToSave object
            dataToSave[key] = value;
        }
    }

    if (isEmptyFieldPresent) {
        showLoadMessages('Error: Missing required contact data');
        return;
    }

    // Dynamically generate the storage key based on the form's ID
    const storageKey = `${formId.replace("-form", "-storage")}`;

    storage.set({ [storageKey]: dataToSave })
        .then(() => {
            showLoadMessages_princContact('Settings saved');
            // Optionally call a display function here, or handle it separately depending on the form
            displayFormData(formId);
        })
        .catch((error) => {
            console.error(error);
            showLoadMessages_princContact('Error saving settings');
        });
}
//////////////////////////////////////////////////////////

// async function displayPrincContactChanges() {
//     const items = await storage.get(['princContactData']);
//     userDataFromStorage = items['princContactData'];

//     let messages = []; // Array to store the messages

//     if (userDataFromStorage) {
//         if (userDataFromStorage.princFirstNameStorage) {
//             princFirstNameDisp.innerText = userDataFromStorage.princFirstNameStorage;
//             // showMessage('Displayed saved user first name.');
//             messages.push('Displayed saved user first name.');

//         }
//         if (userDataFromStorage.princLastNameStorage) {
//             princLastNameDisp.innerText = userDataFromStorage.princLastNameStorage;
//             // showMessage('Displayed saved user last name.');
//             messages.push('Displayed saved user last name.');

//         }
//         if (userDataFromStorage.princEmailStorage) {
//             princEmailDisp.innerText = userDataFromStorage.princEmailStorage;
//             // showMessage('Displayed saved user email.');
//             messages.push('Displayed saved user email.');

//         }
//         if (userDataFromStorage.princPhoneStorage) {
//             princPhoneDisp.innerText = userDataFromStorage.princPhoneStorage;
//             // showMessage('Displayed saved user phone number.');
//             messages.push('Displayed saved user phone number.');

//         }
//     }
//     showDisplayMessages_princContact(messages.join(' '));
// }

/////////////////////////////////////
function displayFormData(formId) {
    const storageKey = `${formId.replace("-form", "-storage")}`;

    console.log('storageKey:', storageKey);

    storage.get([storageKey])
        .then(items => {
            console.log('items:', items);
            const formData = items[storageKey];
            console.log('formData:', formData);
            let messages = []; // Array to store the messages

            if (formData) {
                const fieldMappings = Object.keys(formData)
                    .reduce((mappings, key) => {
                        const displayElementId = key.replace("-storage", "");
                        mappings[key] = displayElementId;
                        return mappings;
                    }, {});

                console.log('fieldMappings:', fieldMappings);

                for (const [storageKey, displayElementId] of Object.entries(fieldMappings)) {
                    console.log('storageKey:', storageKey);
                    console.log('displayElementId:', displayElementId);
                    const displayElement = document.getElementById(displayElementId);
                    console.log('displayElement:', displayElement);
                    displayElement.value = formData[storageKey];
                    messages.push(`Displayed saved ${storageKey.replace("-storage", "")}.`);
                }
            }

            console.log('messages:', messages);
            showDisplayMessages_princContact(messages.join(' '));
        })
        .catch(error => {
            console.error(error);
        });
}





//////////////////////////////
// async function savePrincContChanges() {
//     console.log('Submit button clicked');

//     // Get the current contact-user data from the form.
//     const princFirstNameVal = princFirstNameField.value;
//     const princLastNameVal = princLastNameField.value;
//     const princEmailVal = princEmailField.value;
//     const princPhoneVal = princPhoneField.value;

//     // Check that all values are present.
//     if (!princFirstNameVal || !princLastNameVal || !princEmailVal || !princPhoneVal) {
//         showLoadMessages('Error: Missing required contact data');
//         return;
//     }

//     // Save the data using the Chrome extension storage API.
//     await storage.set({
//         princContactData: {
//             princFirstNameStorage: princFirstNameVal,
//             princLastNameStorage: princLastNameVal,
//             princEmailStorage: princEmailVal,
//             princPhoneStorage: princPhoneVal,
//         }
//     });
//     showLoadMessages_princContact('Settings saved');
//     displayPrincContactChanges();
// }

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

// async function displayPrincContactChanges() {
//     const items = await storage.get(['princContactData']);
//     userDataFromStorage = items['princContactData'];

//     let messages = []; // Array to store the messages

//     if (userDataFromStorage) {
//         if (userDataFromStorage.princFirstNameStorage) {
//             princFirstNameDisp.innerText = userDataFromStorage.princFirstNameStorage;
//             // showMessage('Displayed saved user first name.');
//             messages.push('Displayed saved user first name.');

//         }
//         if (userDataFromStorage.princLastNameStorage) {
//             princLastNameDisp.innerText = userDataFromStorage.princLastNameStorage;
//             // showMessage('Displayed saved user last name.');
//             messages.push('Displayed saved user last name.');

//         }
//         if (userDataFromStorage.princEmailStorage) {
//             princEmailDisp.innerText = userDataFromStorage.princEmailStorage;
//             // showMessage('Displayed saved user email.');
//             messages.push('Displayed saved user email.');

//         }
//         if (userDataFromStorage.princPhoneStorage) {
//             princPhoneDisp.innerText = userDataFromStorage.princPhoneStorage;
//             // showMessage('Displayed saved user phone number.');
//             messages.push('Displayed saved user phone number.');

//         }
//     }
//     showDisplayMessages_princContact(messages.join(' '));
// }


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


async function fetchElectronicNotaryList(event) {
    event.preventDefault();

    const apiUrl = `https://data.ny.gov/resource/rwbv-mz6z.json?commission_type_traditional_or_electronic=Electronic`;

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

            // Slice the first 10 objects from the response
            const firstTen = data.slice(0, 10);

            // Call the new function to populate the table
            populateTable(firstTen);
        })
        .catch(error => {
            console.error("Error:", error);
        });

    console.log("API call initiated...");
}

function populateTable(data) {

    // Create an array of all the cell elements
    const cells = [
        [commission_holder_name_1, commission_number_uid_1, commissioned_county_1, commission_type_traditional_or_electronic_1, term_issue_date_1, term_expiration_date_1],
        [commission_holder_name_2, commission_number_uid_2, commissioned_county_2, commission_type_traditional_or_electronic_2, term_issue_date_2, term_expiration_date_2],
        [commission_holder_name_3, commission_number_uid_3, commissioned_county_3, commission_type_traditional_or_electronic_3, term_issue_date_3, term_expiration_date_3],
        [commission_holder_name_4, commission_number_uid_4, commissioned_county_4, commission_type_traditional_or_electronic_4, term_issue_date_4, term_expiration_date_4],
        [commission_holder_name_5, commission_number_uid_5, commissioned_county_5, commission_type_traditional_or_electronic_5, term_issue_date_5, term_expiration_date_5],
        [commission_holder_name_6, commission_number_uid_6, commissioned_county_6, commission_type_traditional_or_electronic_6, term_issue_date_6, term_expiration_date_6],
        [commission_holder_name_7, commission_number_uid_7, commissioned_county_7, commission_type_traditional_or_electronic_7, term_issue_date_7, term_expiration_date_7],
        [commission_holder_name_8, commission_number_uid_8, commissioned_county_8, commission_type_traditional_or_electronic_8, term_issue_date_8, term_expiration_date_8],
        [commission_holder_name_9, commission_number_uid_9, commissioned_county_9, commission_type_traditional_or_electronic_9, term_issue_date_9, term_expiration_date_9],
        [commission_holder_name_10, commission_number_uid_10, commissioned_county_10, commission_type_traditional_or_electronic_10, term_issue_date_10, term_expiration_date_10]
    ];

    // For each object, populate the cells of the corresponding row with the object's properties
    data.forEach((item, index) => {
        const rowCells = cells[index];

        rowCells[0].textContent = item.commission_holder_name;
        rowCells[1].textContent = item.commission_number_uid;
        rowCells[2].textContent = item.commissioned_county;
        rowCells[3].textContent = item.commission_type_traditional_or_electronic;

        // Parse and format the dates
        const issueDate = new Date(item.term_issue_date);
        rowCells[4].textContent = `${issueDate.getMonth() + 1}/${issueDate.getDate()}/${issueDate.getFullYear()}`;

        const expirationDate = new Date(item.term_expiration_date);
        rowCells[5].textContent = `${expirationDate.getMonth() + 1}/${expirationDate.getDate()}/${expirationDate.getFullYear()}`;
    });
}

function saveNotaryToContactList(event) {
    // Get the row number from the button's id
    const rowNumber = event.target.id.replace('princeNotarySearchResultRow', '').replace('saveBtn', '');

    // Get the cells for this row
    const rowCells = cells[rowNumber - 1];

    // Create an object with the data from the row
    const notaryData = {
        commission_holder_name: rowCells[0].textContent,
        commission_number_uid: rowCells[1].textContent,
        commissioned_county: rowCells[2].textContent,
        commission_type_traditional_or_electronic: rowCells[3].textContent,
        term_issue_date: rowCells[4].textContent,
        term_expiration_date: rowCells[5].textContent
    };

    console.log('Saving notary data:', notaryData);

    // Get the existing princNotaryContactList from local storage, or initialize it to an empty array if it doesn't exist
    storage.get('princNotaryContactList', function (result) {
        const princNotaryContactList = result.princNotaryContactList || [];

        console.log('Existing princNotaryContactList:', princNotaryContactList);

        // Add the new notary data to the list
        princNotaryContactList.push(notaryData);

        console.log('Updated princNotaryContactList:', princNotaryContactList);

        // Save the updated list back to local storage
        storage.set({ princNotaryContactList: princNotaryContactList }, function () {
            console.log('princNotaryContactList saved successfully!');
        });
    });
}
