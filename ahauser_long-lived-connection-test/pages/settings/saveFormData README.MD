# NOTES ON THE CODE BELOW:
````

function saveFormData(formId) {
    getFormAndData(formId)
        .then(({ dataToSave, storageKey }) => {
            return processFormData(formId, dataToSave)
                .then(dataToSave => ({ dataToSave, storageKey }));
        })
        .then(({ dataToSave, storageKey }) => {
            return saveDataToStorage(formId, storageKey, dataToSave);
        })
        .then(dataToSave => {
            console.log('Data saved:', JSON.stringify(dataToSave));
            showLoadMessages_princContact('Settings saved');
            displayFormData(formId, dataToSave);
            displaySidePanelData(formId, dataToSave);
            console.log('Data saved successfully');
        })
        .catch((error) => {
            console.error('Error:', error);
            showLoadMessages_princContact('Error saving settings');
        });
}

function getFormAndData(formId) {
    console.log(`${formId} submit button clicked`);

    const form = document.getElementById(formId);
    if (!form) {
        throw new Error(`No form found with id ${formId}`);
    }

    const storageKey = `${formId.replace("-form", "-storage")}`;

    return storage.get([storageKey])
        .then(items => {
            // Initialize dataToSave as an array if there's no data in storage
            const dataToSave = Array.isArray(items[storageKey]) ? items[storageKey] : [];
            return { dataToSave, storageKey };
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


function displayFormData(formId, data) {
    const storageKey = `${formId.replace("-form", "-storage")}`;

    const displayData = data => {
        // Handle the data as an array of objects
        for (const obj of data) {
            for (const [key, value] of Object.entries(obj)) {
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
        }
    };

    if (data) {
        displayData(data);
    } else {
        storage.get([storageKey], function (result) {
            const formData = result[storageKey];
            if (formData) {
                displayData(formData);
            } else {
                console.log(`Error: No data found in local storage for key ${storageKey}`);
            }
        });
    }
}

function displaySidePanelData(formId, data) {
    const storageKey = `${formId.replace("-form", "-storage")}`;
    console.log(`storageKey: ${storageKey}, data:`, data);

    switch (formId) {
        case 'principal-contact-form':
            handlePrincipalContactDisplay(data);
            break;
        case 'principal-address-form':
            handlePrincipalAddressDisplay(data);
            break;
        case 'principal-billing-form':
            handlePrincipalCreditCardDisplay(data);
            break;
        case 'principal-scheduling-form':
            handlePrincipalSchedulingDisplay(data);
            break;
        case 'principal-profile-pic-form':
            handlePrincipalProfilePicDisplay(data);
            break;
        case 'notary-contact-form':
            handleNotaryContactDisplay(data);
            break;
        case 'notary-address-form':
            handleNotaryAddressDisplay(data);
            break;
        case 'notary-credit-card-form':
            handleNotaryCreditCardDisplay(data);
            break;
        case 'notary-sched-form':
            handleNotarySchedulingDisplay(data);
            break;
        case 'notary-clients-form':
            handleNotaryClientsDisplay(data);
            break;
        case 'notary-commission-form':
            handleNotaryCommissionDisplay(data);
            break;
        case 'notary-docs-form':
            handleNotaryDocsDisplay(data);
            break;
        case 'notary-project-form':
            handleNotaryProjectsDisplay(data);
            break;
        case 'notary-signature-form':
            handleNotarySignatureDisplay(data);
            break;
        default:
            console.error(`Unhandled form id: ${formId}`);
    }
}
````

## saveFormData 
The saveFormData function is the main function that orchestrates the process of saving form data to local storage and displaying it. Here's a step-by-step breakdown of what each function does:

1. getFormAndData(formId): This function is called with the form ID as an argument. It retrieves the form element from the DOM and the associated data from local storage. If no data is found in local storage, it initializes dataToSave as an empty array. It returns an object containing dataToSave and storageKey.

---

QUESTION: what is the benefit to having the getFormAndData function retrieve data from local storage associated with a formId if that data will be saved over later by the saveDataToStorage function?

ANSWER: The getFormAndData function retrieves existing data from local storage associated with a form ID. This can be beneficial for several reasons:

A. Pre-population of form fields: If the form is being loaded for the first time in a session, the existing data can be used to pre-populate the form fields. This can provide a better user experience, especially in cases where the form is large or complex.

B. Data preservation: If the form data is being updated rather than completely replaced, the existing data needs to be retrieved first. The new data can then be merged with the existing data before being saved back to local storage. This is particularly important in cases where the form allows for multiple entries, like in the case of 'notary-docs-form' in your code.

C. Data validation: The existing data can be used for validation purposes. For example, you might want to check if the new data is actually different from the existing data before deciding to save it.

D. Error recovery: If an error occurs while processing the new form data, the existing data can be used as a fallback.

In the context of your code, the getFormAndData function initializes dataToSave as an array with the existing data if it's available, or an empty array if it's not. This is useful in the case of 'notary-docs-form', where new documents are added to the existing documents rather than replacing them.

---

2. processFormData(formId, dataToSave): This function processes the form data based on the form ID. It calls the appropriate handler function for the form (e.g., handleNotaryCommissionForm for the 'notary-commission-form' ID) and passes the form ID and dataToSave to it. Each handler function is responsible for processing the form data and returning it in a format suitable for saving to local storage.

3. saveDataToStorage(formId, storageKey, dataToSave): This function saves the processed form data to local storage. If the form ID is 'notary-docs-form', it retrieves the existing documents from local storage, filters out any documents that already exist, and saves the new and existing documents to local storage. For other form IDs, it simply saves the form data to local storage. It returns the saved data.

4. displayFormData(formId, dataToSave): This function displays the saved form data. It retrieves the form data from local storage (if not provided) and displays it in the appropriate form fields in the DOM.

5. displaySidePanelData(formId, dataToSave): This function displays the saved form data in the side panel. It calls the appropriate display function for the form (e.g., handleNotaryCommissionDisplay for the 'notary-commission-form' ID) and passes the saved data to it. Each display function is responsible for displaying the data in the side panel.
The handleNotaryCommissionForm function processes the data for the 'notary-commission-form'. It iterates over the form inputs, processes the input values based on their type, and adds them to dataToSave. If any required input is empty, it rejects the promise with an error.

The handleNotaryCommissionDisplay function displays the data for the 'notary-commission-form' in the side panel. It calls displayDataAsKeyValuePairs with the saved data, which displays the data as key-value pairs in the side panel.

The displayDataAsKeyValuePairs function iterates over the saved data (an array of objects), and for each object, it iterates over its properties (key-value pairs). For each property, it finds the corresponding side panel element in the DOM and sets its text content to the property value. If the value is an array, it joins the array elements into a string. If the value matches the ISO 8601 date format, it formats the timestamp. If the side panel element is an image, it sets its source to the base64-encoded image data.