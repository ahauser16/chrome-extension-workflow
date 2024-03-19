
function displayPrincipalContactInForm(data) {
    displayDataAsFormElements(data);
}

function displayPrincipalAddressInForm(data) {
    displayDataAsFormElements(data);
}

function displayPrincipalCreditCardInForm(data) {
    displayDataAsFormElements(data);
}

function displayPrincipalSchedulingInForm(data) {
    displayDataAsFormElements(data);
}

function displayPrincipalProfilePicInForm(data) {
    displayDataAsFormElements(data);
}

function displayNotaryContactInForm(data) {
    displayDataAsFormElements(data);
}

function displayNotaryAddressInForm(data) {
    displayDataAsFormElements(data);
}

function displayNotaryCreditCardInForm(data) {
    displayDataAsFormElements(data);
}

function displayNotarySchedulingInForm(data) {
    displayDataAsFormElements(data);
}

function displayNotaryClientsInForm(data) {
    displayDataAsFormElements(data);
}

function displayNotaryCommissionInForm(data) {
    displayDataAsFormElements(data);
}

function displayNotaryDocsInForm(data) {
    displayDataAsFormElements(data);
}

function displayNotaryProjectsInForm(data) {
    displayDataAsFormElements(data);
}

function displayNotarySignatureInForm(data) {
    displayDataAsFormElements(data);
}

module.exports = {
    displayPrincipalContactInForm, displayPrincipalAddressInForm, displayPrincipalCreditCardInForm, displayPrincipalSchedulingInForm, displayPrincipalProfilePicInForm, displayNotaryContactInForm, displayNotaryAddressInForm, displayNotaryCreditCardInForm, displayNotarySchedulingInForm, displayNotaryClientsInForm, displayNotaryCommissionInForm, displayNotaryDocsInForm, displayNotaryProjectsInForm, displayNotarySignatureInForm
};
function displayDataAsFormElements(data) {
    for (const obj of data) {
        for (const [key, value] of Object.entries(obj)) {
            try {
                const displayElement = document.getElementById(key);
                if (!displayElement) {
                    console.log(`Error: No element found with id ${key}`);
                    continue;
                }
                switch (displayElement.type) {
                    case 'text':
                    case 'email':
                    case 'tel':
                    case 'textarea':
                        displayElement.value = value;
                        break;
                    case 'date':
                        displayDataAsDateTypeElement(displayElement, value);
                        break;
                    case 'select-one':
                    case 'select-multiple':
                        displayDataAsSelectElement(displayElement, value);
                        break;
                    case 'file':
                        registerDataAsFileElement(displayElement, value, key);
                        break;
                    default:
                        console.error(`Unhandled form element type: ${displayElement.type}`);
                }
            } catch (error) {
                console.error('Error processing element. Key:', key, 'Error:', error);
            }
        }
    }
}



function registerDataAsFileElement(element, value, key) {
    // Implement your logic here
    console.log(`File data retrieved for element with id ${key}`);
}

function displayDataAsDateTypeElement(element, value) {
    const date = new Date(value);
    const formattedDate = date.toISOString().split('T')[0];
    element.value = formattedDate;
}

function displayDataAsSelectElement(element, value) {
    for (let i = 0; i < element.options.length; i++) {
        if (Array.isArray(value)) {
            if (value.includes(element.options[i].value)) {
                element.options[i].selected = true;
            }
        } else {
            if (element.options[i].value === value) {
                element.options[i].selected = true;
            }
        }
    }
}
