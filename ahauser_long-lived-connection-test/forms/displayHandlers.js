
// Example display function
function handlePrincipalContactDisplay(data) {
    // Display logic for principal contact info...
    displayDataAsKeyValuePairs(data);
}

function handlePrincipalAddressDisplay(data) {
    // Display logic for principal contact info...
    displayDataAsKeyValuePairs(data);
}

function handlePrincipalCreditCardDisplay(data) {
    // Display logic for principal contact info...
    displayDataAsKeyValuePairs(data);
}

function handlePrincipalSchedulingDisplay(data) {
    // Display logic for principal contact info...
    displayDataAsKeyValuePairs(data);
}

function handleNotaryContactDisplay(data) {
    // Display logic for principal contact info...
    displayDataAsKeyValuePairs(data);
}

function handleNotaryAddressDisplay(data) {
    // Display logic for principal contact info...
    displayDataAsKeyValuePairs(data);
}

function handleNotaryCreditCardDisplay(data) {
    // Display logic for principal contact info...
    displayDataAsKeyValuePairs(data);
}

// function handleNotarySchedulingDisplay(data) {
//     // Display logic for principal contact info...
//     displayDataAsKeyValuePairs(data);
// }

function handleNotaryCommissionDisplay(data) {
    // List of keys that are expected to be dates
    const dateKeys = ['notary-commission-issuance-date', 'notary-commission-expiration-date']; // Add your actual keys here

    // Handle the data as an object of key-value pairs
    for (const [key, value] of Object.entries(data)) {
        const sidePanelElementId = `${key}-sidepanel`;
        const sidePanelElement = document.getElementById(sidePanelElementId);
        if (sidePanelElement) {
            if (sidePanelElement.tagName === 'IMG') {
                sidePanelElement.src = 'data:image/png;base64,' + value;
            } else {
                // Check if the current key is in the list of date keys
                sidePanelElement.textContent = dateKeys.includes(key) ? formatTimestamp(value) : value;
            }
        } else {
            console.log(`Error: No side panel element found with id ${sidePanelElementId}, key: ${key}, value:`, value); // Added console.log
        }
    }
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



module.exports = { handlePrincipalContactDisplay, handlePrincipalAddressDisplay, handlePrincipalCreditCardDisplay, handlePrincipalSchedulingDisplay, handleNotaryContactDisplay, handleNotaryAddressDisplay, handleNotaryCreditCardDisplay, handleNotarySchedulingDisplay, handleNotaryCommissionDisplay };


// Add more display functions as needed...

function displayDataAsKeyValuePairs(data) {
    // List of keys that are expected to be dates
    const dateKeys = ['notary-commission-issuance-date', 'notary-commission-expiration-date', 'notary-issuance-date', 'notary-expiration-date']; // Add your actual keys here

    // Handle the data as an array of objects
    for (const obj of data) {
        for (const [key, value] of Object.entries(obj)) {
            const sidePanelElementId = `${key}-sidepanel`;
            const sidePanelElement = document.getElementById(sidePanelElementId);
            if (sidePanelElement) {
                if (sidePanelElement.tagName === 'IMG') {
                    sidePanelElement.src = 'data:image/png;base64,' + value;
                } else {
                    // Check if the current key is in the list of date keys
                    sidePanelElement.textContent = dateKeys.includes(key) ? formatTimestamp(value) : value;
                }
            } else {
                console.log(`Error: No side panel element found with id ${sidePanelElementId}, key: ${key}, value:`, value); // Added console.log
            }
        }
    }
}