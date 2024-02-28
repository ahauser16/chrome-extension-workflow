// formHandlers.js

function handlePrincipleContactInfoForm(form, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

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
                    dataToSave[element.id] = value;
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

function handlePrincipleAddressForm(form, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

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
                    dataToSave[element.id] = value;
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

function handlePrincipleCreditCardForm(form, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

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
                    dataToSave[element.id] = value;
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

function handlePrincipleSchedulingForm(form, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

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
                    dataToSave[element.id] = value;
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

function handleNotaryContactForm(form, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

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
                    dataToSave[element.id] = value;
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

function handleNotaryAddressForm(form, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

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
                    dataToSave[element.id] = value;
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

function handleNotaryCreditCardForm(form, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

        for (let element of form.getElementsByClassName('formInput')) {
            const value = element.value;
            console.log(`Key: ${element.id}, Value: ${value}`);

            switch (element.id) {
                case 'notary-name-on-credit-card':
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
                    dataToSave[element.id] = value;
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

function handleNotarySchedulingForm(form, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

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
                    dataToSave[element.id] = value;
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

function handleNotaryCommissionForm(form, dataToSave) {
    return new Promise((resolve, reject) => {
        let isEmptyFieldPresent = false;

        for (let element of form.getElementsByClassName('formInput')) {
            const value = element.value;
            console.log(`Key: ${element.id}, Value: ${value}`);

            switch (element.id) {
                case 'notary-commission-reg-state':
                case 'notary-commission-reg-county':
                case 'notary-commission-num':
                case 'notary-commission-first-name':
                case 'notary-commission-last-name':
                case 'notary-commission-govt-id-type':
                    if (!value) {
                        isEmptyFieldPresent = true;
                        break;
                    }
                    dataToSave[element.id] = value;
                    break;
                case 'notary-commission-issuance-date':
                case 'notary-commission-expiration-date':
                    if (!handleDateInput(element, dataToSave)) {
                        isEmptyFieldPresent = true;
                    }
                    break;
                case 'notary-commission-filed-county':
                    if (!handleMultSelectInput(element, dataToSave)) {
                        isEmptyFieldPresent = true;
                    }
                    break;
                case 'notary-commission-govt-id-front':
                case 'notary-commission-govt-id-back':
                    handleFileTypeInput(element, dataToSave).catch(error => {
                        console.error(`Error handling file input: ${error}`);
                        isEmptyFieldPresent = true;
                    });
                    break;
                default:
                    console.log(`Unhandled form input id: ${element.id}`);
                    break;
            }

            if (isEmptyFieldPresent) {
                reject(new Error('Missing required commission data'));
            }
        }

        resolve(dataToSave);
    });
}
///


// async function handleNotaryProjectsDocsForm(form, dataToSave) {
//     let isEmptyFieldPresent = false;
//     let docData = {};
//     let promises = [];

//     for (let element of form.getElementsByClassName('formInput')) {
//         const value = element.value;
//         console.log(`Key: ${element.id}, Value: ${value}`);

//         switch (element.id) {
//             case 'notary-document-upload':
//                 promises.push(handleFileTypeInput(element, docData));
//                 break;
//             case 'notary-document-upload-notes':
//                 if (!value) {
//                     isEmptyFieldPresent = true;
//                     break;
//                 }
//                 docData[element.id] = value;
//                 break;
//             default:
//                 console.log(`Unhandled form input id: ${element.id}`);
//                 break;
//         }

//         if (isEmptyFieldPresent) {
//             throw new Error('Missing required document data');
//         }
//     }

//     // Wait for all promises to resolve
//     await Promise.all(promises);

//     // Add the new document data to the array
//     dataToSave.push(docData);

//     return dataToSave;
// }
async function handleNotaryProjectsDocsForm(form) {
    let isEmptyFieldPresent = false;
    let docData = {};
    let promises = [];

    for (let element of form.getElementsByClassName('formInput')) {
        const value = element.value;
        console.log(`Key: ${element.id}, Value: ${value}`);

        switch (element.id) {
            case 'notary-document-upload':
                promises.push(handleFileTypeInput(element, docData));
                break;
            case 'notary-document-upload-notes':
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

    // Add the new record to the array
    addRecord(newRecord);

    // Save the updated records array to localStorage
    localStorage.setItem('records', JSON.stringify(records));
}

function createRecord(docData) {
    return {
        id: createId(),
        document: docData.file,
        documentName: docData.file.name,
        documentSize: docData.file.size,
        documentType: docData.file.type,
        lastModified: docData.file.lastModified,
        notes: docData.notes
    };
}

function handleFileTypeInput(element, docData) {
    return new Promise((resolve, reject) => {
        const file = element.files[0];
        if (file) {
            docData.file = file;
            resolve();
        } else {
            reject(new Error('No file selected'));
        }
    });
}
/// the following are CRUD functions for the `handleNotaryProjectsDocsForm` function

///
module.exports = { handlePrincipleContactInfoForm, handlePrincipleAddressForm, handlePrincipleCreditCardForm, handlePrincipleSchedulingForm, handleNotaryContactForm, handleNotaryAddressForm, handleNotaryCreditCardForm, handleNotarySchedulingForm, handleNotaryCommissionForm, handleNotaryProjectsDocsForm };

//helper functions below.  not exported so they are not accessible outside of this module.

function handleDateInput(element, dataToSave) {
    const dateValue = new Date(element.value);
    if (isNaN(dateValue)) {
        return false;
    }
    dataToSave[element.id] = dateValue.getTime(); // Save as timestamp
    return true;
}

function handleMultSelectInput(element, dataToSave) {
    // If the input field is a multiple select
    const selectedOptions = Array.from(element.selectedOptions).map(option => option.value);
    if (selectedOptions.length === 0) {
        return false;
    }
    dataToSave[element.id] = selectedOptions;
    return true;
}

async function handleFileTypeInput(element, dataToSave) {
    // If the file input is empty
    if (element.files.length === 0) {
        throw new Error('Empty file input');
    }

    // List of keys that are expected to be documents
    const documentKeys = ['notary-document-upload', 'document2']; // Add your actual keys here

    // List of keys that are expected to be images
    const imageKeys = ['principal-profile-pic', 'principal-signature', 'notary-commission-govt-id-front', 'notary-commission-govt-id-back', 'notary-signature', 'notary-stamp', 'notary-profile-pic']; // Add your actual keys here

    // Create an array to hold promises for each file
    const filesData = await Promise.all(Array.from(element.files).map(async (file) => {
        const reader = new FileReader();
        const result = await new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

        const base64String = result.replace('data:', '').replace(/^.+,/, '');

        // Create an object to hold the file data
        const fileData = {
            file: base64String,
            'file-name': file.name,
        };

        // Add the file metadata to the fileData object if the file is a document
        if (documentKeys.includes(element.id)) {
            fileData['file-size'] = file.size;
            fileData['file-type'] = file.type;
            fileData['file-lastModified'] = file.lastModified;
        } else if (imageKeys.includes(element.id)) {
            // Do nothing, we only want to save the file and file-name for images
        } else {
            throw new Error(`Error: Unrecognized key ${element.id}`);
        }

        console.log(`File uploaded: ${file.name}`);
        return fileData;
    }));

    // If there's only one file, save the file data directly, otherwise save the array of file data
    dataToSave[element.id] = filesData.length === 1 ? filesData[0] : filesData;
}