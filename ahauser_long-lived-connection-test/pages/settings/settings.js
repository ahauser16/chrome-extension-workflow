
// Store user data in the "local" storage area.
const storage = chrome.storage.local;

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
princElectronicNotarySearchSubmitButton.addEventListener('click', fetchElectronicNotaryList);

////////////////
// Load any user data that may have previously been saved.

document.addEventListener('DOMContentLoaded', () => {
    populateStates();
    populateNewYorkCounties();

    const formIds = [
        'principal-contact-form',
        'principal-address-form',
        'principal-billing-form',
        'principal-scheduling-form',
        "principal-profile-pic-form",
        'notary-contact-form',
        'notary-address-form',
        'notary-credit-card-form',
        'notary-sched-form',
        'notary-clients-form',
        'notary-commission-form',
        'notary-docs-form',
        'notary-project-form',
        'notary-signature-form',
        // Add more form IDs as needed
    ];

    formIds.forEach(formId => {
        displayContentOnLoad(formId);
    });

});


//////////////////////////

const princContactResetButton = document.querySelector('#princ-contact-resetBtn');
princContactResetButton.addEventListener('click', function (e) {
    e.preventDefault();
    clearLocalStorageByKey('principal-contact-storage', ["principal-first-name-sidepanel", "principal-last-name-sidepanel", "principal-email-sidepanel", "principal-phone-sidepanel"]
    );
});

const princAddressResetButton = document.querySelector('#princ-address-resetBtn');
princAddressResetButton.addEventListener('click', function (e) {
    e.preventDefault();
    clearLocalStorageByKey('principal-address-storage', ["principal-address1-sidepanel", "principal-address2-sidepanel", "principal-city-sidepanel", "principal-state-sidepanel", "principal-zip-sidepanel"]);
});

const princBillingResetButton = document.querySelector('#princ-billing-resetBtn');
princBillingResetButton.addEventListener('click', function (e) {
    e.preventDefault();
    clearLocalStorageByKey('principal-billing-storage', ["princ-first-name-credit-card-sidepanel", "princ-last-name-credit-card-sidepanel", "princ-credit-card-number-sidepanel", "princ-credit-card-expiration-sidepanel", "princ-credit-card-cvv-sidepanel", "princ-credit-card-address1-sidepanel", "princ-credit-card-address2-sidepanel", "princ-credit-card-city-sidepanel", "princ-credit-card-state-sidepanel", "princ-credit-card-zip-sidepanel"]);
});

const princSchedResetButton = document.querySelector('#princ-scheduling-resetBtn');
princSchedResetButton.addEventListener('click', function (e) {
    e.preventDefault();
    clearLocalStorageByKey('principal-scheduling-storage', ["principal-time-zone-select-sidepanel", "principal-pref-contact-method-sidepanel", "principal-contact-notes-public-sidepanel"]
    );
});

const notaryContactResetBtn = document.querySelector('#notary-contact-resetBtn');
notaryContactResetBtn.addEventListener('click', function (e) {
    e.preventDefault();
    clearLocalStorageByKey('notary-contact-storage', ["notary-first-name-sidepanel", "notary-last-name-sidepanel", "notary-email-sidepanel", "notary-phone-sidepanel"]
    );
});

const notaryAddressResetBtn = document.querySelector('#notary-address-resetBtn');
notaryAddressResetBtn.addEventListener('click', function (e) {
    e.preventDefault();
    clearLocalStorageByKey('notary-address-storage', ["notary-address1-sidepanel", "notary-address2-sidepanel", "notary-city-sidepanel", "notary-state-sidepanel", "notary-zip-sidepanel"]
    );
});

const notaryBillingResetBtn = document.querySelector('#notary-credit-card-resetBtn');
notaryBillingResetBtn.addEventListener('click', function (e) {
    e.preventDefault();
    clearLocalStorageByKey('notary-credit-card-storage', ["notary-first-name-credit-card-sidepanel", "notary-last-name-credit-card-sidepanel", "notary-credit-card-number-sidepanel", "notary-credit-card-expiration-sidepanel", "notary-credit-card-cvv-sidepanel", "notary-credit-card-address1-sidepanel", "notary-credit-card-address2-sidepanel", "notary-credit-card-city-sidepanel", "notary-credit-card-state-sidepanel", "notary-credit-card-zip-sidepanel"]
    );
});


const notarySchedResetBtn = document.querySelector('#notary-sched-resetBtn');
notarySchedResetBtn.addEventListener('click', function (e) {
    e.preventDefault();
    clearLocalStorageByKey('notary-sched-storage', ["notary-time-zone-select-sidepanel", "notary-pref-contact-method-sidepanel", "notary-contact-notes-public-sidepanel"]
    );
});
///

const notaryCommissionResetBtn = document.querySelector('#notary-commission-resetBtn');
notaryCommissionResetBtn.addEventListener('click', function (e) {
    e.preventDefault();
    clearLocalStorageByKey('notary-commission-storage', ["notary-commission-reg-county-sidepanel", "notary-commission-filed-county-sidepanel", "notary-commission-num-sidepanel", "notary-commission-first-name-sidepanel", "notary-commission-last-name-sidepanel", "notary-commission-issuance-date-sidepanel", "notary-commission-expiration-date-sidepanel", "notary-commission-govt-id-front-sidepanel", "notary-commission-govt-id-back-sidepanel"]
    );
});


///notary-commission-reg-state-sidepanel
const notaryDocsResetBtn = document.querySelector('#notary-document-storage-resetBtn');
notaryDocsResetBtn.addEventListener('click', function (e) {
    e.preventDefault();
    clearLocalStorageByKey('notary-docs-storage', ["notary-document-list-sidepanel"]
    );
});

///


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

const principalCCForm = document.getElementById('principal-billing-form');
const principalCCFormSubmitButton = document.querySelector('#princ-credit-card-saveBtn');

principalCCFormSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('principal-billing-form');
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

const notarySchedulingForm = document.getElementById('notary-sched-form');
const notarySchedulingFormSubmitButton = document.querySelector('#notary-sched-saveBtn');

notarySchedulingFormSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('notary-sched-form');
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
/////////////////////////////////
const notaryDocsForm = document.getElementById('notary-docs-form');
const notaryDocsFormSubmitButton = document.querySelector('#notary-document-upload-saveBtn');

notaryDocsFormSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('notary-docs-form');
});

const notaryDocsStorageResetButton = document.querySelector('#notary-document-storage-resetBtn');

notaryDocsStorageResetButton.addEventListener('click', function () {
    clearLocalStorageByKey('notary-docs-storage', 'notary-document-list-sidepanel');
});

const notaryProjectForm = document.getElementById('notary-project-form');
const notaryProjectFormSubmitButton = document.querySelector('#notary-create-project-saveBtn');

notaryProjectFormSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('notary-project-form');
});

const notaryProjectStorageResetButton = document.querySelector('#notary-project-storage-resetBtn');

notaryProjectStorageResetButton.addEventListener('click', function () {
    clearLocalStorageByKey('notary-project-storage', 'notary-project-list-sidepanel');
});
/////////////////////////////////
const notarySigForm = document.getElementById('notary-signature-form');
const notarySigFormSubmitButton = document.querySelector('#notary-signature-upload-saveBtn');

notarySigFormSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData('notary-signature-form');
});
////////////

function displayContentOnLoad(formId) {
    const storageKey = `${formId.replace("-form", "-storage")}`;

    storage.get([storageKey], function (result) {
        const formData = result[storageKey];
        if (formData) {
            displayFormData(formId, formData, storageKey); 
            displaySidePanelData(formId, formData, storageKey); 
        } else {
            console.log(`Error: No data found in local storage for key ${storageKey}`);
        }
    });
}

function saveFormData(formId) {
    const storageKey = `${formId.replace("-form", "-storage")}`;

    getFormAndData(formId, storageKey)
        .then(dataToSave => {
            return processFormData(formId, dataToSave)
                .then(dataToSave => ({ dataToSave, storageKey }));
        })
        .then(({ dataToSave, storageKey }) => {
            return saveDataToStorage(formId, storageKey, dataToSave);
        })
        .then(dataToSave => {
            console.log('Data saved:', JSON.stringify(dataToSave));
            showLoadMessages_princContact('Settings saved');
            displayFormData(formId, dataToSave, storageKey);
            displaySidePanelData(formId, dataToSave, storageKey);
            console.log('Data saved successfully');
        })
        .catch((error) => {
            console.error('Error:', error);
            showLoadMessages_princContact('Error saving settings');
        });
}

function getFormAndData(formId, storageKey) {
    console.log(`${formId} submit button clicked`);

    const form = document.getElementById(formId);
    if (!form) {
        throw new Error(`No form found with id ${formId}`);
    }

    return storage.get([storageKey])
        .then(items => {
            // Initialize dataToSave as an array if there's no data in storage
            const dataToSave = Array.isArray(items[storageKey]) ? items[storageKey] : [];
            return dataToSave;
        });
}

function processFormData(formId, dataToSave) {
    return new Promise((resolve, reject) => {
        try {
            console.log('Processing form data for form:', formId); // Added console log
            console.log('Initial data to save:', JSON.stringify(dataToSave)); // why is the metadata all equal to 'undefined' at this point?
            switch (formId) {
                case 'principal-contact-form':
                    resolve(handlePrincipleContactInfoForm(formId, dataToSave));
                    break;
                case 'principal-address-form':
                    resolve(handlePrincipleAddressForm(formId, dataToSave));
                    break;
                case 'principal-billing-form':
                    resolve(handlePrincipleCreditCardForm(formId, dataToSave));
                    break;
                case 'principal-scheduling-form':
                    resolve(handlePrincipleSchedulingForm(formId, dataToSave));
                    break;
                case 'notary-contact-form':
                    resolve(handleNotaryContactForm(formId, dataToSave));
                    break;
                case 'notary-address-form':
                    resolve(handleNotaryAddressForm(formId, dataToSave));
                    break;
                case 'notary-credit-card-form':
                    resolve(handleNotaryCreditCardForm(formId, dataToSave));
                    break;
                case 'notary-sched-form':
                    resolve(handleNotarySchedulingForm(formId, dataToSave));
                    break;
                case 'notary-commission-form':
                    resolve(handleNotaryCommissionForm(formId, dataToSave));
                    break;
                case 'notary-docs-form':
                    resolve(handleNotaryDocsForm(formId, dataToSave));
                    break;
                case 'notary-project-form':
                    resolve(handleNotaryProjectForm(formId, dataToSave));
                    break;
                case 'example-form':
                    resolve(exampleForm(formId, dataToSave));
                    break;
                default:
                    throw new Error(`Unhandled form id: ${formId}`);
            }
        } catch (error) {
            reject(error);
        }
    });
}

function saveDataToStorage(formId, storageKey, dataToSave) {
    console.log('Saving data to storage for form:', formId);
    console.log('Final data to save:', JSON.stringify(dataToSave));

    let savePromise;

    if (formId === 'notary-docs-form') {
        savePromise = storage.get([storageKey])
            .then(items => {
                let documents = items[storageKey];

                if (!Array.isArray(documents)) {
                    console.error('Error: Data in storage is not an array', documents);
                    documents = [];
                }

                if (!Array.isArray(dataToSave)) {
                    dataToSave = [dataToSave];
                }

                // Filter dataToSave to exclude items that already exist in documents
                dataToSave = dataToSave.filter(dataItem => !documents.some(doc => doc.id === dataItem.id));

                documents = [...documents, ...dataToSave];

                return storage.set({ [storageKey]: documents });
            });
    } else {
        savePromise = storage.set({ [storageKey]: dataToSave });
    }

    return savePromise.then(() => dataToSave);
}

function displayFormData(formId, data, storageKey) {
    console.log(`display data in FORM from storageKey: ${storageKey}, data:`, data);

    switch (formId) {
        case 'principal-contact-form':
            displayPrincipalContactInForm(data);
            break;
        case 'principal-address-form':
            displayPrincipalAddressInForm(data);
            break;
        case 'principal-billing-form':
            displayPrincipalCreditCardInForm(data);
            break;
        case 'principal-scheduling-form':
            displayPrincipalSchedulingInForm(data);
            break;
        case 'principal-profile-pic-form':
            displayPrincipalProfilePicInForm(data);
            break;
        case 'notary-contact-form':
            displayNotaryContactInForm(data);
            break;
        case 'notary-address-form':
            displayNotaryAddressInForm(data);
            break;
        case 'notary-credit-card-form':
            displayNotaryCreditCardInForm(data);
            break;
        case 'notary-sched-form':
            displayNotarySchedulingInForm(data);
            break;
        case 'notary-clients-form':
            displayNotaryClientsInForm(data);
            break;
        case 'notary-commission-form':
            displayNotaryCommissionInForm(data);
            break;
        case 'notary-docs-form':
            displayNotaryDocsInForm(data);
            break;
        case 'notary-project-form':
            displayNotaryProjectsInForm(data);
            break;
        case 'notary-signature-form':
            displayNotarySignatureInForm(data);
            break;
        default:
            console.error(`Unhandled form id: ${formId}`);
    }
}

function displaySidePanelData(formId, data, storageKey) {
    console.log(`display data in SIDEPANEL from storageKey: ${storageKey}, data:`, data);

    switch (formId) {
        case 'principal-contact-form':
            displayPrincipalContactInSidePanel(data);
            break;
        case 'principal-address-form':
            displayPrincipalAddressInSidePanel(data);
            break;
        case 'principal-billing-form':
            displayPrincipalCreditCardInSidePanel(data);
            break;
        case 'principal-scheduling-form':
            displayPrincipalSchedulingInSidePanel(data);
            break;
        case 'principal-profile-pic-form':
            displayPrincipalProfilePicInSidePanel(data);
            break;
        case 'notary-contact-form':
            displayNotaryContactInSidePanel(data);
            break;
        case 'notary-address-form':
            displayNotaryAddressInSidePanel(data);
            break;
        case 'notary-credit-card-form':
            displayNotaryCreditCardInSidePanel(data);
            break;
        case 'notary-sched-form':
            displayNotarySchedulingInSidePanel(data);
            break;
        case 'notary-clients-form':
            displayNotaryClientsInSidePanel(data);
            break;
        case 'notary-commission-form':
            displayNotaryCommissionInSidePanel(data);
            break;
        case 'notary-docs-form':
            displayNotaryDocsInSidePanel(data);
            break;
        case 'notary-project-form':
            displayNotaryProjectsInSidePanel(data);
            break;
        case 'notary-signature-form':
            displayNotarySignatureInSidePanel(data);
            break;
        default:
            console.error(`Unhandled form id: ${formId}`);
    }
}


////////////////////////

function clearLocalStorageByKey(key, displayIds) {
    storage.remove(key, function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        } else {
            console.log(`Data for ${key} removed`);

            // Clear the display for each ID in the array
            for (const displayId of displayIds) {
                const displayElement = document.getElementById(displayId);
                if (displayElement) {
                    if (displayElement.tagName === 'IMG') {
                        // If the element is an img, clear its src
                        displayElement.src = '';
                    } else {
                        // Otherwise, clear its innerHTML
                        displayElement.innerHTML = '';
                    }
                    console.log(`Display for ${displayId} cleared`);
                } else {
                    console.log(`No element found with id ${displayId}`);
                }
            }
        }
    });
}

function formatTimestamp(timestamp) {
    // Create a new Date object from the timestamp
    const date = new Date(timestamp);

    // Format the date and time
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York', timeZoneName: 'short' };
    const formattedDate = date.toLocaleString('en-US', options);

    return formattedDate;
}

function fileSizeConversion(num) {
    const sizeInKB = num / 1024;
    const sizeInMB = num / (1024 * 1024);
    const sizeInGB = num / (1024 * 1024 * 1024);

    if (num < 1024 * 1024) {
        // If the file size is less than 1 MB, return the size in kilobytes
        return sizeInKB.toFixed(2) + ' KB';
    } else if (num < 1024 * 1024 * 1024) {
        // If the file size is less than 1 GB, return the size in megabytes
        return sizeInMB.toFixed(2) + ' MB';
    } else {
        // If the file size is 1 GB or more, return the size in gigabytes
        return sizeInGB.toFixed(2) + ' GB';
    }
}

function createDocListItem(data) {
    console.log('createDocListItem data:', data); // Added console.log

    // Create a new <li> element with the desired structure
    const docItem = document.createElement('li');
    docItem.className = 'uploaded-doc-item-sidepanel';

    const notaryDocNameDisplay = document.createElement('a');
    notaryDocNameDisplay.className = 'notary-doc-name';
    notaryDocNameDisplay.textContent = data['fileName'];

    const notaryDocFileSizeGroup = document.createElement('div');
    notaryDocFileSizeGroup.className = 'sidepanelGroup';

    const notaryDocFileSizeLabel = document.createElement('h6');
    notaryDocFileSizeLabel.className = 'notary-doc-file-size-label';
    notaryDocFileSizeLabel.textContent = "Size: ";

    const notaryDocFileSizeDisplay = document.createElement('h6');
    notaryDocFileSizeDisplay.className = 'notary-doc-file-size';
    notaryDocFileSizeDisplay.textContent = fileSizeConversion(data['fileSize']);

    notaryDocFileSizeGroup.appendChild(notaryDocFileSizeLabel);
    notaryDocFileSizeGroup.appendChild(notaryDocFileSizeDisplay);

    const notaryDocFileTypeGroup = document.createElement('div');
    notaryDocFileTypeGroup.className = 'sidepanelGroup';

    const notaryDocFileTypeLabel = document.createElement('h6');
    notaryDocFileTypeLabel.className = 'notary-doc-file-type-label';
    notaryDocFileTypeLabel.textContent = "Type: ";

    const notaryDocFileTypeDisplay = document.createElement('h6');
    notaryDocFileTypeDisplay.className = 'notary-doc-file-type';
    notaryDocFileTypeDisplay.textContent = data['fileType'];

    notaryDocFileTypeGroup.appendChild(notaryDocFileTypeLabel);
    notaryDocFileTypeGroup.appendChild(notaryDocFileTypeDisplay);

    const notaryDocFileLastModGroup = document.createElement('div');
    notaryDocFileLastModGroup.className = 'sidepanelGroup';

    const notaryDocFileLastModLabel = document.createElement('h6');
    notaryDocFileLastModLabel.className = 'notary-doc-file-last-modified-label';
    notaryDocFileLastModLabel.textContent = "Last Modified: ";

    const notaryDocFileLastModDisplay = document.createElement('h6');
    notaryDocFileLastModDisplay.className = 'notary-doc-file-last-modified';
    notaryDocFileLastModDisplay.textContent = formatTimestamp(data['fileLastModified']);

    notaryDocFileLastModGroup.appendChild(notaryDocFileLastModLabel);
    notaryDocFileLastModGroup.appendChild(notaryDocFileLastModDisplay);

    const notaryDocNoteGroup = document.createElement('div');
    notaryDocNoteGroup.className = 'sidepanelGroup';

    const notaryDocNoteLabel = document.createElement('h3');
    notaryDocNoteLabel.className = 'notary-document-upload-notes-label';
    notaryDocNoteLabel.textContent = "Note: ";

    const notaryDocNote = document.createElement('p');
    notaryDocNote.className = 'notary-document-upload-notes';
    notaryDocNote.textContent = data['notary-document-upload-notes'];

    const line1 = document.createElement('div');
    line1.className = 'uploaded-doc-item-line1';
    line1.appendChild(notaryDocNameDisplay);

    const line2 = document.createElement('div');
    line2.className = 'uploaded-doc-item-line2';
    line2.appendChild(notaryDocFileSizeGroup);
    line2.appendChild(notaryDocFileTypeGroup);
    line2.appendChild(notaryDocFileLastModGroup);


    const line3 = document.createElement('div');
    line3.className = 'uploaded-doc-item-line3';
    line3.appendChild(notaryDocNoteLabel);
    line3.appendChild(notaryDocNote);

    docItem.appendChild(line1);
    docItem.appendChild(line2);
    docItem.appendChild(line3);

    return docItem;
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

// function populateDocumentSelection(docs) {
//     // Get the select element
//     const select = document.getElementById('notary-project-document-selection');

//     // Add an option for each document
//     for (const doc of docs) {
//         const option = document.createElement('option');
//         option.value = doc.id; // Set the value to the id of the document
//         option.textContent = doc.documentName; // Set the text content to the documentName of the document

//         // Set the data attributes
//         option.dataset.fileName = doc.documentName; // Use the camelCase key
//         option.dataset.fileSize = doc.documentSize; // Use the camelCase key
//         option.dataset.fileType = doc.documentType; // Use the camelCase key
//         option.dataset.fileLastModified = doc.lastModified; // Use the camelCase key

//         select.appendChild(option);
//     }
// }

// function displayDocumentMetadata(docs) {
//     // Get the ul element
//     const ul = document.getElementById('notary-document-list-sidepanel');

//     // Add a li for each document
//     for (const doc of docs) {
//         const li = document.createElement('li');
//         li.innerHTML = `
//             <p>${doc.documentName}</p>
//             <p>Size: ${doc.documentSize / 1000} KB</p>
//             <p>Type: ${doc.documentType}</p>
//             <p>ID: ${doc.id}</p>
//             <p>Last Modified: ${doc.lastModified}</p>
//             <p>Notes: ${doc.notes || ''}</p>
//         `;
//         ul.appendChild(li);
//     }
// }