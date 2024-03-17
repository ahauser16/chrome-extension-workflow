function handlePrincipalContactDisplay(data) {
    displayDataAsKeyValuePairs(data);
}

function handlePrincipalAddressDisplay(data) {
    displayDataAsKeyValuePairs(data);
}

function handlePrincipalCreditCardDisplay(data) {
    displayDataAsKeyValuePairs(data);
}

function handlePrincipalSchedulingDisplay(data) {
    displayDataAsKeyValuePairs(data);
}

function handleNotaryContactDisplay(data) {
    displayDataAsKeyValuePairs(data);
}

function handleNotaryAddressDisplay(data) {
    displayDataAsKeyValuePairs(data);
}

function handleNotaryCreditCardDisplay(data) {
    displayDataAsKeyValuePairs(data);
}

function handleNotarySchedulingDisplay(data) {
    displayDataAsKeyValuePairs(data);
}

function handleNotaryCommissionDisplay(data) {
    displayDataAsKeyValuePairs(data);
}

function handleNotaryDocsDisplay(data) {
    const curatedDocs = [
        {
            id: 'default-notary-doc-a',
            documentName: 'Acknowledgement of Conveyance Form',
            path: 'assets/legal memoranda/Acknowledgement of Conveyance Form.txt',
            documentSize: '762', // Replace 'placeholder' with the actual file size
            documentType: 'txt', // Replace 'placeholder' with the actual file type
            lastModified: 'Friday, March 15, 2024, 1:30:15 PM' // Replace 'placeholder' with the actual last modified date
        },
        {
            id: 'default-notary-doc-b',
            documentName: 'Certificate of Subscribing Witness Form',
            path: 'assets/legal memoranda/Certificate of Subscribing Witness Form.txt',
            documentSize: '905', // Replace 'placeholder' with the actual file size
            documentType: 'txt', // Replace 'placeholder' with the actual file type
            lastModified: 'Friday, March 15, 2024, 1:31:01 PM' // Replace 'placeholder' with the actual last modified date
        },
        {
            id: 'default-notary-doc-c',
            documentName: 'Corporate Acknowledgement Form',
            path: 'assets/legal memoranda/Corporate Acknowledgement Form.txt',
            documentSize: '1800', // Replace 'placeholder' with the actual file size
            documentType: 'txt', // Replace 'placeholder' with the actual file type
            lastModified: 'Friday, March 15, 2024, 1:29:35 PM' // Replace 'placeholder' with the actual last modified date
        },
    ];

    // If data is not an array, default it to an empty array
    if (!Array.isArray(data)) {
        data = [];
    }

    const ul = document.getElementById('notary-document-list-sidepanel');

    // Clear the ul element
    ul.innerHTML = '';

    // Merge the data from local storage and the curatedDocs array
    const mergedData = [...data, ...curatedDocs];

    // Loop over all documents in the mergedData array
    mergedData.forEach(doc => {
        const li = document.createElement('li');
        li.innerHTML = `
            <p>${doc.documentName}</p>
            <p>Size: ${doc.documentSize / 1000} KB</p>
            <p>Type: ${doc.documentType}</p>
            <p>ID: ${doc.id}</p>
            <p>Last Modified: ${doc.lastModified}</p>
            <p>Notes: ${doc.notes || ''}</p>
        `;
        ul.appendChild(li);
    });
}

function handleNotaryProjectsDisplay(data) {
    // Get the select element
    const select = document.getElementById('notary-project-document-selection');

    // Add an option for each document
    for (const doc of data) {
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


module.exports = { handlePrincipalContactDisplay, handlePrincipalAddressDisplay, handlePrincipalCreditCardDisplay, handlePrincipalSchedulingDisplay, handleNotaryContactDisplay, handleNotaryAddressDisplay, handleNotaryCreditCardDisplay, handleNotarySchedulingDisplay, handleNotaryCommissionDisplay, handleNotaryDocsDisplay, handleNotaryProjectsDisplay };


function displayDataAsKeyValuePairs(data) {
    // Regular expression for ISO 8601 date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

    // Handle the data as an array of objects
    for (const obj of data) {
        for (const [key, value] of Object.entries(obj)) {
            const sidePanelElementId = `${key}-sidepanel`;
            const sidePanelElement = document.getElementById(sidePanelElementId);
            if (sidePanelElement) {
                if (sidePanelElement.tagName === 'IMG') {
                    sidePanelElement.src = 'data:image/png;base64,' + value;
                } else {
                    // Check if the value is an array
                    if (Array.isArray(value)) {
                        // Join the array elements into a string
                        sidePanelElement.textContent = value.join(', ');
                    } else {
                        // Check if the value matches the date format
                        sidePanelElement.textContent = dateRegex.test(value) ? formatTimestamp(value) : value;
                    }
                }
            } else {
                console.log(`Error: No side panel element found with id ${sidePanelElementId}, key: ${key}, value:`, value);
            }
        }
    }
}

function formatTimestamp(timestamp) {
    // Split the timestamp into its components and create a new Date object
    const dateParts = timestamp.split("-").map(part => parseInt(part, 10));
    const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

    // Format the date
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

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


