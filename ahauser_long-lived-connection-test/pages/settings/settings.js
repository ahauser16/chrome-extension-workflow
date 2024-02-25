// Store user data in the "local" storage area.
const storage = chrome.storage.local;

const princContactResetButton = document.querySelector('#princ-contact-resetBtn');

const princAddressResetButton = document.querySelector('#princ-address-resetBtn');

const princCCresetButton = document.querySelector('#princ-credit-card-resetBtn');

// const princSchedSubmitButton = document.querySelector('#princ-scheduling-saveBtn');
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

////////////////
// Load any user data that may have previously been saved.
document.addEventListener('DOMContentLoaded', () => {
    populateStates();
    populateNewYorkCounties();

    const formIds = [
        'principal-contact-form',
        'principal-address-form',
        'principal-credit-card-form',
        'principal-scheduling-form',
        "principal-profile-pic-form",
        'notary-contact-form',
        'notary-address-form',
        'notary-credit-card-form',
        'notary-scheduling-form',
        'notary-clients-form',
        'notary-commission-form',
        'notary-projects-and-docs-form',
        // Add more form IDs as needed
    ];

    formIds.forEach(formId => {
        displayFormData(formId);
        displaySidePanelData(formId);
    });
});

princElectronicNotarySearchSubmitButton.addEventListener('click', fetchElectronicNotaryList);


const principalContactForm = document.getElementById('principal-contact-form');
const principalContactFormSubmitButton = document.querySelector('#princ-contact-saveBtn');

principalContactFormSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('principal-contact-form');
});

const principalAddressForm = document.getElementById('principal-address-form');
const principalAddressFormSubmitButton = document.querySelector('#princ-address-saveBtn');

principalAddressFormSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('principal-address-form');
});

const principalCCForm = document.getElementById('principal-credit-card-form');
const principalCCFormSubmitButton = document.querySelector('#princ-credit-card-saveBtn');

principalCCFormSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('principal-credit-card-form');
});

const principalSchedForm = document.getElementById('principal-scheduling-form');
const principalSchedFormSubmitButton = document.querySelector('#princ-scheduling-saveBtn');

principalSchedFormSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('principal-scheduling-form');
});

const principalProfilePicForm = document.getElementById('principal-profile-pic-form');
const principalProfilePicSubmitButton = document.querySelector('#principal-profile-pic-saveBtn');

principalProfilePicSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('principal-profile-pic-form');
});

const notaryContactForm = document.getElementById('notary-contact-form');
const notaryContactFormSubmitButton = document.querySelector('#notary-contact-saveBtn');

notaryContactFormSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('notary-contact-form');
});

const notaryAddressForm = document.getElementById('notary-address-form');
const notaryAddressFormSubmitButton = document.querySelector('#notary-address-saveBtn');

notaryAddressFormSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('notary-address-form');
});

const notaryCCForm = document.getElementById('notary-credit-card-form');
const notaryCCFormSubmitButton = document.querySelector('#notary-credit-card-saveBtn');

notaryCCFormSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('notary-credit-card-form');
});

const notarySchedulingForm = document.getElementById('notary-scheduling-form');
const notarySchedulingFormSubmitButton = document.querySelector('#notary-scheduling-saveBtn');

notarySchedulingFormSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('notary-scheduling-form');
});

const notaryClientsForm = document.getElementById('notary-clients-form');
const notaryClientsFormSubmitButton = document.querySelector('#notary-clients-saveBtn');

notaryClientsFormSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('notary-clients-form');
});

const notaryCommissionForm = document.getElementById('notary-commission-form');
const notaryCommissionFormSubmitButton = document.querySelector('#notary-commission-saveBtn');

notaryCommissionFormSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('notary-commission-form');
});

const notaryProjsDocsForm = document.getElementById('notary-projects-and-docs-form');
const notaryProjsDocsFormSubmitButton = document.querySelector('#notary-document-upload-saveBtn');

notaryProjsDocsFormSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('notary-projects-and-docs-form');
});
/////

function displayFormData(formId, data) {
    const storageKey = `${formId.replace("-form", "-storage")}`;

    const displayData = data => {
        for (const [key, value] of Object.entries(data)) {
            try {
                const displayElement = document.getElementById(key);
                if (!displayElement) {
                    console.log(`Error: No element found with id ${key}`);
                    continue;
                }
                if (displayElement.type === 'file') {
                    const imgElement = document.getElementById(`${key}-sidepanel`);
                    if (imgElement) {
                        imgElement.src = 'data:image/png;base64,' + value;
                    } else {
                        console.log(`Error: No img element found with id ${key}-sidepanel`);
                    }
                } else {
                    displayElement.value = value;
                }
            } catch (error) {
                console.error('Error processing element. Key:', key, 'Error:', error);
            }
        }
    };

    if (data) {
        displayData(data);
    } else {
        chrome.storage.local.get([storageKey], function (result) {
            const formData = result[storageKey];
            if (formData) {
                displayData(formData);
            } else {
                console.log(`Error: No data found in local storage for key ${storageKey}`);
            }
        });
    }
}

// function formatDate(dateString) {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
// }

function displaySidePanelData(formId, data) {
    const storageKey = `${formId.replace("-form", "-storage")}`;

    const displayData = data => {
        for (const [key, value] of Object.entries(data)) {
            const sidePanelElementId = `${key}-sidepanel`;
            const sidePanelElement = document.getElementById(sidePanelElementId);
            if (sidePanelElement) {
                if (sidePanelElement.tagName === 'IMG') {
                    sidePanelElement.src = 'data:image/png;base64,' + value;
                } else {
                    sidePanelElement.textContent = value;
                }
            } else {
                console.log(`Error: No side panel element found with id ${sidePanelElementId}`);
            }
        }

        // Check if the storageKey is "notary-projects-and-docs-storage"
        if (storageKey === 'notary-projects-and-docs-storage') {
            const ul = document.getElementById('notary-document-list-sidepanel');
            if (ul) {
                // Create a new <li> element with the desired structure
                const li = document.createElement('li');
                li.className = 'uploaded-doc-sidepanel';

                const h3 = document.createElement('h3');
                h3.className = 'notary-doc-name';
                h3.textContent = data['file-name']; // Insert file name

                const p = document.createElement('p');
                p.className = 'notary-doc-note';
                p.textContent = data['notary-document-upload-notes']; // Insert document note

                const a = document.createElement('a');
                a.href = 'data:image/png;base64,' + data['notary-document-upload']; // Insert document link
                a.textContent = 'View Document';

                li.appendChild(h3);
                li.appendChild(p);
                li.appendChild(a);

                // Append the new <li> element to the <ul>
                ul.appendChild(li);
            } else {
                console.log(`Error: No ul element found with id notary-document-upload-sidepanel`);
            }
        }
    };

    if (data) {
        displayData(data);
    } else {
        storage.get([storageKey])
            .then(items => {
                const formData = items[storageKey];
                if (formData) {
                    displayData(formData);
                } else {
                    console.log(`Error: No data found in local storage for key ${storageKey}`);
                }
            })
            .catch(error => {
                console.error('Error retrieving data from storage', error);
            });
    }
}
function saveFormData(formId) {
    console.log(`${formId} submit button clicked`);

    const form = document.getElementById(formId);
    if (!form) {
        console.log(`Error: No form found with id ${formId}`);
        return;
    }

    const dataToSave = {};
    let isEmptyFieldPresent = false;

    // Create an array to hold promises
    const promises = [];

    // Iterate over each input field in the form with the class "formInput"
    for (let element of form.getElementsByClassName('formInput')) {
        const key = element.id; // Use the input's id as the key

        switch (element.type) {
            case 'file':
                // If the file input is empty
                if (element.files.length === 0) {
                    isEmptyFieldPresent = true;
                    break;
                }

                // Convert the file to a base64 string
                const reader = new FileReader();
                reader.readAsDataURL(element.files[0]);

                // Create a new promise
                const promise = new Promise((resolve, reject) => {
                    reader.onload = function () {
                        const base64String = reader.result.replace('data:', '')
                            .replace(/^.+,/, '');

                        // Assign the base64 string to the corresponding key in the dataToSave object
                        dataToSave[key] = base64String;

                        // Add the file name to the dataToSave object
                        dataToSave['file-name'] = element.files[0].name;

                        console.log(`File uploaded: ${key}`);
                        resolve();
                    };
                    reader.onerror = function (error) {
                        console.log('Error: ', error);
                        reject(error);
                    };
                });

                // Add the promise to the array
                promises.push(promise);
                break;
            case 'select-multiple':
                // If the input field is a multiple select
                const selectedOptions = Array.from(element.selectedOptions).map(option => option.value);
                if (selectedOptions.length === 0) {
                    isEmptyFieldPresent = true;
                    break;
                }
                dataToSave[key] = selectedOptions;
                break;
            case 'text':
            case 'textarea':
            case 'select-one':
                // Handle text, textarea, and single select inputs
                const value = element.value; // Get the input's current value

                console.log(`Key: ${key}, Value: ${value}`); // Log the key and value

                // Check if the input field is empty
                if (!value) {
                    isEmptyFieldPresent = true;
                    break;
                }

                // Assign the value to the corresponding key in the dataToSave object
                dataToSave[key] = value;
                break;
            default:
                console.log(`Unhandled form input type: ${element.type}`);
                break;
        }

        if (isEmptyFieldPresent) {
            break;
        }
    }

    if (isEmptyFieldPresent) {
        showLoadMessages('Error: Missing required contact data');
        return;
    }

    // Dynamically generate the storage key based on the form's ID
    const storageKey = `${formId.replace("-form", "-storage")}`;

    console.log(`Storage Key: ${storageKey}`); // Log the storage key

    // Wait for all promises to complete
    Promise.all(promises)
        .then(() => {
            // Before storage.set
            console.log('Data to save:', dataToSave);
            // Save the data
            storage.set({ [storageKey]: dataToSave })
                .then(() => {
                    console.log('Data saved:', dataToSave);
                    showLoadMessages_princContact('Settings saved');
                    // Optionally call a display function here, or handle it separately depending on the form
                    displayFormData(formId, dataToSave);
                    displaySidePanelData(formId, dataToSave);
                    // Inside storage.set then block
                    console.log('Data saved successfully');
                })
                .catch((error) => {
                    console.error('Error saving data:', error);
                    showLoadMessages_princContact('Error saving settings');
                });
        })
        .catch((error) => {
            console.error('Error reading files:', error);
        });
}







/////////////////////////////////////////////
// async function savePrincSchedChanges() {
//     console.log('Submit button clicked');

//     // Get the current contact-user data from the form.
//     const princTimeZoneVal = princTimeZoneField.value;
//     const princPrefContactMethVal = princPrefContactMethField.value;
//     const princContactNotesPublicVal = princContactNotesPublicField.value;



//     // Check that all values are present.
//     if (!princTimeZoneVal || !princPrefContactMethVal || !princContactNotesPublicVal) {
//         showLoadMessages('Error: Missing required scheduling data');
//         return;
//     }

//     // Save the data using the Chrome extension storage API.
//     await storage.set({
//         princSchedData: {
//             princTimeZoneStorage: princTimeZoneVal,
//             princPrefContactMethStorage: princPrefContactMethVal,
//             princContactNotesPublicStorage: princContactNotesPublicVal,
//         }
//     });
//     showLoadMessages_princSched('Settings saved');
//     displayPrincSchedChanges();
// }

// function loadPrincSchedChanges() {
//     storage.get(['princSchedData'], function (items) {
//         userDataFromStorage = items['princSchedData'];

//         let messages = []; // Array to store the messages

//         if (userDataFromStorage) {
//             if (userDataFromStorage.princTimeZoneStorage) {
//                 princTimeZoneField.value = userDataFromStorage.princTimeZoneStorage;
//                 messages.push('Loaded saved user time zone.');
//             }
//             if (userDataFromStorage.princPrefContactMethStorage) {
//                 princPrefContactMethField.value = userDataFromStorage.princPrefContactMethStorage;
//                 messages.push('Loaded saved user preferred contact method.');
//             }
//             if (userDataFromStorage.princContactNotesPublicStorage) {
//                 princContactNotesPublicField.value = userDataFromStorage.princContactNotesPublicStorage;
//                 messages.push('Loaded saved user credit card expiration date.');
//             }
//         }
//         showLoadMessages_princSched(messages.join(' '));
//     });
// }

//////////////////////////////

// async function resetPrincCont() {
//     // Remove the saved values from storage.
//     await storage.remove(['princContactData']);
//     showLoadMessages_princContact('Reset stored principal contact data');
//     // Refresh the text field area.
//     princFirstNameField.value = '';
//     princLastNameField.value = '';
//     princEmailField.value = '';
//     princPhoneField.value = '';

//     // Refresh the sidebar area.
//     princFirstNameDisp.innerText = '';
//     princLastNameDisp.innerText = '';
//     princEmailDisp.innerText = '';
//     princPhoneDisp.innerText = '';
// }

///////////////////////////

// async function displayPrincAddressChanges() {
//     const items = await storage.get(['princAddressData']);
//     userDataFromStorage = items['princAddressData'];

//     let messages = []; // Array to store the messages

//     if (userDataFromStorage) {
//         if (userDataFromStorage.princAddressLine1Storage) {
//             princAddress1Disp.innerText = userDataFromStorage.princAddressLine1Storage;
//             // showMessage('Displayed saved user first name.');
//             messages.push("Displayed saved user's address (line 1).");

//         }
//         if (userDataFromStorage.princAddressLine2Storage) {
//             princAddress2Disp.innerText = userDataFromStorage.princAddressLine2Storage;
//             // showMessage('Displayed saved user last name.');
//             messages.push("Displayed saved user's address (line 2).");

//         }
//         if (userDataFromStorage.princCityStorage) {
//             princCityDisp.innerText = userDataFromStorage.princCityStorage;
//             // showMessage('Displayed saved user email.');
//             messages.push("Displayed saved user's City.");

//         }
//         if (userDataFromStorage.princStateStorage) {
//             princStateDisp.innerText = userDataFromStorage.princStateStorage;
//             // showMessage('Displayed saved user phone number.');
//             messages.push("Displayed saved user's State location.");
//         }
//         if (userDataFromStorage.princZipStorage) {
//             princZipDisp.innerText = userDataFromStorage.princZipStorage;
//             // showMessage('Displayed saved user phone number.');
//             messages.push("Displayed saved user's zip code.");
//         }
//     }
//     showDisplayMessages_princAddr(messages.join(' '));
// }

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
// // Get the principal contact form element
// const form__princContact = document.getElementById('principal-contact-form');

// // Add event listener for form submission
// form__princContact.addEventListener('submit', (event) => {
//     event.preventDefault(); // Prevent form submission

//     // Get the form data
//     const formData = new FormData(form__princContact);

//     // Convert form data to JSON object
//     const data = {};
//     for (let [key, value] of formData.entries()) {
//         data[key] = value;
//     }

//     // Send message to service worker
//     navigator.serviceWorker.controller.postMessage({
//         type: 'storeFormData',
//         data: data
//     });
// });

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
    const selectElement_USstatesReg = document.getElementById("notary-commission-reg-state");
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

    const selectElementReg = document.getElementById("notary-commission-reg-county");
    const selectElementFiled = document.getElementById("notary-commission-filed-county");
    const selectElementRegStamp = document.getElementById("notary-commission-reg-county-stamp");
    const selectElementFiledStamp = document.getElementById("notary-commission-filed-county-stamp");

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

document.getElementById('princ-credit-card-expiration').addEventListener('input', function (e) {

    var target = e.target, position = target.selectionEnd, length = target.value.length;
    target.value = target.value.replace(/[^\d]/g, '').replace(/(\d{2})/, '$1/').trim();
    target.selectionEnd = position += ((target.value.charAt(position - 1) === '/' && target.value.charAt(length - 1) !== '/') ? 1 : 0);
});
