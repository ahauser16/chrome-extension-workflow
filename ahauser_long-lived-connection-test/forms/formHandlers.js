// formHandlers.js

function handlePrincipleContactInfoForm(formId, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

        const form = document.getElementById(formId);
        if (!form) {
            reject(new Error(`No form found with id ${formId}`));
            return;
        }

        for (let element of form.getElementsByClassName('formInput')) {
            const value = element.value;
            console.log(`Key: ${element.id}, Value: ${value}`);

            switch (element.id) {
                case 'principal-first-name':
                case 'principal-last-name':
                case 'principal-email':
                case 'principal-phone':
                    if (!value) {
                        isEmptyFieldPresent = true;
                        break;
                    }
                    // Find the index of the object with the same key in dataToSave
                    const index = dataToSave.findIndex(obj => obj.hasOwnProperty(element.id));
                    if (index !== -1) {
                        // If the object exists, update its value
                        dataToSave[index][element.id] = value;
                    } else {
                        // If the object doesn't exist, add a new object
                        dataToSave.push({ [element.id]: value });
                    }
                    break;
                default:
                    console.log(`Unhandled form input id: ${element.id}`);
                    break;
            }

            if (isEmptyFieldPresent) {
                reject(new Error('Missing required contact data'));
                return;
            }
        }

        resolve(dataToSave);
    });
}

function handlePrincipleAddressForm(formId, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

        const form = document.getElementById(formId);
        if (!form) {
            reject(new Error(`No form found with id ${formId}`));
            return;
        }

        for (let element of form.getElementsByClassName('formInput')) {
            const value = element.value;
            console.log(`Key: ${element.id}, Value: ${value}`);

            switch (element.id) {
                case 'principal-address1':
                case 'principal-address2':
                case 'principal-city':
                case 'principal-state':
                case 'principal-zip':
                    if (!value) {
                        isEmptyFieldPresent = true;
                        break;
                    }
                    // Find the index of the object with the same key in dataToSave
                    const index = dataToSave.findIndex(obj => obj.hasOwnProperty(element.id));
                    if (index !== -1) {
                        // If the object exists, update its value
                        dataToSave[index][element.id] = value;
                    } else {
                        // If the object doesn't exist, add a new object
                        dataToSave.push({ [element.id]: value });
                    }
                    break;
                default:
                    console.log(`Unhandled form input id: ${element.id}`);
                    break;
            }

            if (isEmptyFieldPresent) {
                reject(new Error('Missing required address data'));
                return;
            }
        }

        resolve(dataToSave);
    });
}

function handlePrincipleCreditCardForm(formId, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

        const form = document.getElementById(formId);
        if (!form) {
            reject(new Error(`No form found with id ${formId}`));
            return;
        }

        for (let element of form.getElementsByClassName('formInput')) {
            const value = element.value;
            console.log(`Key: ${element.id}, Value: ${value}`);

            switch (element.id) {
                case 'princ-first-name-credit-card':
                case 'princ-last-name-credit-card':
                case 'princ-credit-card-number':
                case 'princ-credit-card-expiration':
                case 'princ-credit-card-cvv':
                case 'princ-credit-card-address1':
                case 'princ-credit-card-address2':
                case 'princ-credit-card-city':
                case 'princ-credit-card-state':
                case 'princ-credit-card-zip':
                    if (!value) {
                        isEmptyFieldPresent = true;
                        break;
                    }
                    // Find the index of the object with the same key in dataToSave
                    const index = dataToSave.findIndex(obj => obj.hasOwnProperty(element.id));
                    if (index !== -1) {
                        // If the object exists, update its value
                        dataToSave[index][element.id] = value;
                    } else {
                        // If the object doesn't exist, add a new object
                        dataToSave.push({ [element.id]: value });
                    }
                    break;
                default:
                    console.log(`Unhandled form input id: ${element.id}`);
                    break;
            }

            if (isEmptyFieldPresent) {
                reject(new Error('Missing required credit card data'));
            }
        }

        resolve(dataToSave);
    });
}

function handlePrincipleSchedulingForm(formId, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

        const form = document.getElementById(formId);
        if (!form) {
            reject(new Error(`No form found with id ${formId}`));
            return;
        }

        for (let element of form.getElementsByClassName('formInput')) {
            const value = element.value;
            console.log(`Key: ${element.id}, Value: ${value}`);

            switch (element.id) {
                case 'principal-time-zone-select':
                case 'principal-pref-contact-method':
                case 'principal-contact-notes-public':
                    if (!value || value === 'select' || value === 'contact-method') {
                        isEmptyFieldPresent = true;
                        break;
                    }
                    // Find the index of the object with the same key in dataToSave
                    const index = dataToSave.findIndex(obj => obj.hasOwnProperty(element.id));
                    if (index !== -1) {
                        // If the object exists, update its value
                        dataToSave[index][element.id] = value;
                    } else {
                        // If the object doesn't exist, add a new object
                        dataToSave.push({ [element.id]: value });
                    }
                    break;
                default:
                    console.log(`Unhandled form input id: ${element.id}`);
                    break;
            }

            if (isEmptyFieldPresent) {
                reject(new Error('Missing required scheduling data'));
            }
        }

        resolve(dataToSave);
    });
}


function handleNotaryContactForm(formId, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

        const form = document.getElementById(formId);
        if (!form) {
            reject(new Error(`No form found with id ${formId}`));
            return;
        }

        for (let element of form.getElementsByClassName('formInput')) {
            const value = element.value;
            console.log(`Key: ${element.id}, Value: ${value}`);

            switch (element.id) {
                case 'notary-first-name':
                case 'notary-last-name':
                case 'notary-email':
                case 'notary-phone':
                    if (!value) {
                        isEmptyFieldPresent = true;
                        break;
                    }
                    // Find the index of the object with the same key in dataToSave
                    const index = dataToSave.findIndex(obj => obj.hasOwnProperty(element.id));
                    if (index !== -1) {
                        // If the object exists, update its value
                        dataToSave[index][element.id] = value;
                    } else {
                        // If the object doesn't exist, add a new object
                        dataToSave.push({ [element.id]: value });
                    }
                    break;
                default:
                    console.log(`Unhandled form input id: ${element.id}`);
                    break;
            }

            if (isEmptyFieldPresent) {
                reject(new Error('Missing required contact data'));
            }
        }

        resolve(dataToSave);
    });
}

function handleNotaryAddressForm(formId, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

        const form = document.getElementById(formId);
        if (!form) {
            reject(new Error(`No form found with id ${formId}`));
            return;
        }

        for (let element of form.getElementsByClassName('formInput')) {
            const value = element.value;
            console.log(`Key: ${element.id}, Value: ${value}`);

            switch (element.id) {
                case 'notary-address1':
                case 'notary-address2':
                case 'notary-city':
                case 'notary-state':
                case 'notary-zip':
                    if (!value) {
                        isEmptyFieldPresent = true;
                        break;
                    }
                    // Find the index of the object with the same key in dataToSave
                    const index = dataToSave.findIndex(obj => obj.hasOwnProperty(element.id));
                    if (index !== -1) {
                        // If the object exists, update its value
                        dataToSave[index][element.id] = value;
                    } else {
                        // If the object doesn't exist, add a new object
                        dataToSave.push({ [element.id]: value });
                    }
                    break;
                default:
                    console.log(`Unhandled form input id: ${element.id}`);
                    break;
            }

            if (isEmptyFieldPresent) {
                reject(new Error('Missing required address data'));
            }
        }

        resolve(dataToSave);
    });
}

function handleNotaryCreditCardForm(formId, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

        const form = document.getElementById(formId);
        if (!form) {
            reject(new Error(`No form found with id ${formId}`));
            return;
        }

        for (let element of form.getElementsByClassName('formInput')) {
            const value = element.value;
            console.log(`Key: ${element.id}, Value: ${value}`);

            switch (element.id) {
                case 'notary-first-name-credit-card':
                case 'notary-last-name-credit-card':
                case 'notary-credit-card-number':
                case 'notary-credit-card-expiration':
                case 'notary-credit-card-cvv':
                case 'notary-credit-card-address1':
                case 'notary-credit-card-address2':
                case 'notary-credit-card-city':
                case 'notary-credit-card-state':
                case 'notary-credit-card-zip':
                    if (!value) {
                        isEmptyFieldPresent = true;
                        break;
                    }
                    // Find the index of the object with the same key in dataToSave
                    const index = dataToSave.findIndex(obj => obj.hasOwnProperty(element.id));
                    if (index !== -1) {
                        // If the object exists, update its value
                        dataToSave[index][element.id] = value;
                    } else {
                        // If the object doesn't exist, add a new object
                        dataToSave.push({ [element.id]: value });
                    }
                    break;
                default:
                    console.log(`Unhandled form input id: ${element.id}`);
                    break;
            }

            if (isEmptyFieldPresent) {
                reject(new Error('Missing required credit card data'));
            }
        }

        resolve(dataToSave);
    });
}

function handleNotarySchedulingForm(formId, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

        const form = document.getElementById(formId);
        if (!form) {
            reject(new Error(`No form found with id ${formId}`));
            return;
        }

        for (let element of form.getElementsByClassName('formInput')) {
            const value = element.value;
            console.log(`Key: ${element.id}, Value: ${value}`);

            switch (element.id) {
                case 'notary-time-zone-select':
                case 'notary-pref-contact-method':
                case 'notary-contact-notes-public':
                    if (!value) {
                        isEmptyFieldPresent = true;
                        break;
                    }
                    // Find the index of the object with the same key in dataToSave
                    const index = dataToSave.findIndex(obj => obj.hasOwnProperty(element.id));
                    if (index !== -1) {
                        // If the object exists, update its value
                        dataToSave[index][element.id] = value;
                    } else {
                        // If the object doesn't exist, add a new object
                        dataToSave.push({ [element.id]: value });
                    }
                    break;
                default:
                    console.log(`Unhandled form input id: ${element.id}`);
                    break;
            }

            if (isEmptyFieldPresent) {
                reject(new Error('Missing required scheduling data'));
            }
        }

        resolve(dataToSave);
    });
}

function handleNotaryCommissionForm(formId, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;
        let promises = [];


        const form = document.getElementById(formId);
        if (!form) {
            reject(new Error(`No form found with id ${formId}`));
            return;
        }

        for (let element of form.getElementsByClassName('formInput')) {
            if (!element.id || element.value === undefined || element.type === 'button') {
                continue; // Skip elements without an id or value, and buttons
            }

            const value = element.value;
            console.log(`Key: ${element.id}, Value: ${value}`);

            if (element.type === 'select-one' || element.type === 'select-multiple') {
                const selectedOptions = Array.from(element.selectedOptions).map(option => option.value);
                if (selectedOptions.length === 0) {
                    isEmptyFieldPresent = true;
                } else {
                    if (element.id === 'notary-commission-filed-county') {
                        dataToSave.push({ 'notary-commission-filed-county': selectedOptions });
                    } else {
                        dataToSave.push({ [element.id]: selectedOptions[0] });
                    }
                }
            } else if (element.type === 'file') {
                if (element.files.length === 0) {
                    isEmptyFieldPresent = true;
                } else {
                    promises.push(
                        handleImageInput(element).then(base64String => {
                            dataToSave.push({ [element.id]: base64String });
                        }).catch(error => {
                            console.error(`Error handling file input: ${error}`);
                            isEmptyFieldPresent = true;
                        })
                    );
                }
            } else if (element.type === 'date') {
                if (!handleDateInput(element, dataToSave)) {
                    isEmptyFieldPresent = true;
                }
            } else {
                if (!value) {
                    isEmptyFieldPresent = true;
                } else {
                    dataToSave.push({ [element.id]: value });
                }
            }

            if (isEmptyFieldPresent) {
                reject(new Error('Missing required commission data'));
                return;
            }
        }

        Promise.all(promises).then(() => resolve(dataToSave));
    });
}

/////////////////////////////////////

async function handleNotaryDocsForm(formId, dataToSave) {
    let isEmptyFieldPresent = false;
    let docData = {};
    let promises = [];

    const form = document.getElementById(formId);
    if (!form) {
        reject(new Error(`No form found with id ${formId}`));
        return;
    }

    for (let element of form.getElementsByClassName('formInput')) {
        const value = element.value;
        console.log(`Key: ${element.id}, Value: ${value}`);

        switch (element.id) {
            case 'notary-doc-upload':
                if (element.files.length > 0) {
                    promises.push(handleFileInput(element, docData));
                }
                break;
            case 'notary-docNote-upload':
                if (!value) {
                    isEmptyFieldPresent = true;
                    break;
                }
                docData.notes = value;
                break;
            default:
                console.log(`Unhandled form input id: ${element.id}`);
                break;
        }

        if (isEmptyFieldPresent) {
            throw new Error('Missing required document data');
        }
    }

    // Wait for all promises to resolve
    await Promise.all(promises);

    // Create a new record with the document data
    const newRecord = createRecord(docData);

    // Check if an item with the same id already exists in dataToSave
    if (!dataToSave.some(item => item.id === newRecord.id)) {
        // If not, add the new record to dataToSave
        dataToSave.push(newRecord);
    }

    console.log('New record:', newRecord); // Added console log

    // Add the new document to the document selection in the project form
    populateDocumentSelection([newRecord]); // Wrap newRecord in an array because populateDocumentSelection expects an array

    // Return dataToSave
    return dataToSave;
}

function handleNotaryProjectForm(formId, dataToSave) {
    return new Promise((resolve, reject) => {
        const form = document.getElementById(formId);
        if (!form) {
            reject(new Error(`No form found with id ${formId}`));
            return;
        }

        const projectData = {
            id: createId(),
            projectName: form.querySelector('#project-name').value,
            projectDescription: form.querySelector('#project-description').value,
            notarialService: form.querySelector('#notarial-service').value,
            notarialAct: form.querySelector('#notarial-act').value,
            documentSelection: Array.from(form.querySelector('#notary-project-document-selection').selectedOptions).map(option => option.value)
        };

        dataToSave.push(projectData);
        resolve(dataToSave);
    });
}



///
module.exports = { handlePrincipleContactInfoForm, handlePrincipleAddressForm, handlePrincipleCreditCardForm, handlePrincipleSchedulingForm, handleNotaryContactForm, handleNotaryAddressForm, handleNotaryCreditCardForm, handleNotarySchedulingForm, handleNotaryCommissionForm, handleNotaryDocsForm, handleNotaryProjectForm };

function handleImageInput(element) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); // Get the Base64 string
        reader.onerror = reject;
        reader.readAsDataURL(element.files[0]); // Pass the first File object
    });
}

function handleDateInput(element, dataToSave) {
    const dateValue = new Date(element.value);
    if (isNaN(dateValue)) {
        return false;
    }
    dataToSave.push({ [element.id]: dateValue.toISOString() }); // Save as ISO string
    return true;
}

function createId() {
    return Date.now().toString();
}

function createRecord(docData) {
    return {
        id: createId(),
        document: docData.file,
        documentName: docData['fileName'],
        documentSize: docData['fileSize'],
        documentType: docData['fileType'],
        lastModified: docData['fileLastModified'],
        notes: docData.notes
    };
}

function handleFileInput(element, docData) {
    return new Promise((resolve, reject) => {
        if (element.files.length === 0) {
            reject(new Error('No file selected'));
            return;
        }

        const file = element.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            docData.file = reader.result.split(',')[1]; // Get the Base64 string
            docData['fileName'] = file.name;
            docData['fileSize'] = file.size;
            docData['fileType'] = file.type;
            docData['fileLastModified'] = file.lastModified;
            resolve();
        };
        reader.onerror = reject;
        reader.readAsDataURL(file); // Pass the first File object
    });
}

function populateDocumentSelection(docs) {
    // Get the select element
    const select = document.getElementById('notary-project-document-selection');

    // Add an option for each document
    for (const doc of docs) {
        const option = document.createElement('option');
        option.value = doc.id; // Set the value to the id of the document
        option.textContent = doc.documentName; // Set the text content to the documentName of the document

        // Set the data attributes
        option.dataset.fileName = doc.documentName; // Use the camelCase key
        option.dataset.fileSize = doc.documentSize; // Use the camelCase key
        option.dataset.fileType = doc.documentType; // Use the camelCase key
        option.dataset.fileLastModified = doc.lastModified; // Use the camelCase key

        select.appendChild(option);
    }
}