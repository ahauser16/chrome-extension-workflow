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
    const ul = document.getElementById('notary-document-list-sidepanel');

    // Loop over all documents in the data array
    data.forEach(doc => {
        const li = document.createElement('li');
        li.classList.add('doc-item');

        const a = document.createElement('a');
        a.textContent = doc.documentName;
        a.href = doc.document;
        a.target = '_blank'; // Open in a new tab
        a.classList.add('doc-link');

        const pSize = document.createElement('p');
        // Use fileSizeConversion to convert the file size
        pSize.textContent = `Size: ${fileSizeConversion(doc.documentSize)}`;
        pSize.classList.add('doc-size');

        const pType = document.createElement('p');
        pType.textContent = `Type: ${doc.documentType}`;
        pType.classList.add('doc-type');

        const pId = document.createElement('p');
        pId.textContent = `ID: ${doc.id}`;
        pId.classList.add('doc-id');

        const pLastModified = document.createElement('p');
        pLastModified.textContent = `Last Modified: ${new Date(doc.lastModified).toLocaleString()}`;
        pLastModified.classList.add('doc-last-modified');

        const pNotes = document.createElement('p');
        pNotes.textContent = `Notes: ${doc.notes}`;
        pNotes.classList.add('doc-notes');

        li.append(a, pSize, pType, pId, pLastModified, pNotes);
        ul.appendChild(li);
    });
}



module.exports = { handlePrincipalContactDisplay, handlePrincipalAddressDisplay, handlePrincipalCreditCardDisplay, handlePrincipalSchedulingDisplay, handleNotaryContactDisplay, handleNotaryAddressDisplay, handleNotaryCreditCardDisplay, handleNotarySchedulingDisplay, handleNotaryCommissionDisplay, handleNotaryDocsDisplay };


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