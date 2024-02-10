// General Note: Ensure that contentScript.js is focused on handling any interactions specific to the Google Meet page that are still relevant to your extension's functionality. For example, if you need to trigger any actions when a Google Meet session starts or ends, you would handle that here.

//ExtractMeetingId-Step 1-->Extracting the Meeting ID in the Content Script (meetingIdAcquisition)
const port = chrome.runtime.connect({ name: "liveMeetConnection" });//<--Line A

// Function to extract meeting ID
function extractMeetingId() {
  const url = window.location.href;
  const meetingId = url.split("meet.google.com/")[1].split("?")[0];
  return meetingId;
}

// ExtractMeetingId-Step 2-->Send the meeting ID to the background script
const meetingId = extractMeetingId();
port.postMessage({ type: "MEETING_ID", meetingId: meetingId });

port.postMessage({ greeting: "hello" });

port.onMessage.addListener((msg) => {
  console.log("Message received from background script:", msg); // Log received messages
  if (msg.greeting === "hi there!") {//<--Line D
    console.log("Received 'hi there!' from background script");
    // Example interaction: Change the background color of the Google Meet page
    document.body.style.backgroundColor = 'lightblue';
  }
});







//workflow once user has saved files to storage and is about to join live session.
//SaveFiles2Storage - Step 1: Retrieve Files from Storage
function retrieveFiles() {
  console.log("Retrieving files from local storage...");
  chrome.storage.local.get(['uploadedFiles'], (result) => {
    if (chrome.runtime.lastError) {
      console.error("Error retrieving files:", chrome.runtime.lastError.message);
      return;
    }

    const files = result.uploadedFiles;
    if (!files) {
      console.log("No files found in local storage.");
      return;
    }

    console.log("Files retrieved:", Object.keys(files));
    // displayFiles(files);


    if (result.uploadedFiles) {
      displayFiles(result.uploadedFiles);
    } else {
      console.log('No files found in storage.');
    }
  });
}
retrieveFiles();




///////////notepad below

async function loadChanges() {
  storage.get(['user-data'], function (items) {
      const userData = items['user-data'];
      if (userData && userData['principal-contact-info']) {
          const principalContactInfo = userData['principal-contact-info'];
          if (principalContactInfo.princFirstNameStorage) {
              princFirstNameField.value = principalContactInfo.princFirstNameStorage;
              showMessage('Loaded saved user first name.');
          }
          if (principalContactInfo.princLastNameStorage) {
              princLastNameField.value = principalContactInfo.princLastNameStorage;
              showMessage('Loaded saved user last name.');
          }
          if (principalContactInfo.princEmailStorage) {
              princEmailField.value = principalContactInfo.princEmailStorage;
              showMessage('Loaded saved user email.');
          }
          if (principalContactInfo.princPhoneStorage) {
              princPhoneField.value = principalContactInfo.princPhoneStorage;
              showMessage('Loaded saved user phone number.');
          }
      }
  });
}

async function displayChanges() {
  const items = await storage.get(['user-data']);

  const userData = items['user-data'];
  if (userData && userData['principal-contact-info']) {
      const principalContactInfo = userData['principal-contact-info'];
      if (principalContactInfo.princFirstNameStorage) {
          princFirstNameDisp.innerText = principalContactInfo.princFirstNameStorage;
          showMessage('Displayed saved user first name.');
      }
      if (principalContactInfo.princLastNameStorage) {
          princLastNameDisp.innerText = principalContactInfo.princLastNameStorage;
          showMessage('Displayed saved user last name.');
      }
      if (principalContactInfo.princEmailStorage) {
          princEmailDisp.innerText = principalContactInfo.princEmailStorage;
          showMessage('Displayed saved user email.');
      }
      if (principalContactInfo.princPhoneStorage) {
          princPhoneDisp.innerText = principalContactInfo.princPhoneStorage;
          showMessage('Displayed saved user phone number.');
      }
  }
}

function showMessage(msg) {
  clearTimeout(messageClearTimer);
  const message = document.querySelector('.message');
  message.innerText = msg;
  messageClearTimer = setTimeout(function () {
      message.innerText = '';
  }, 3000);
}



//////
function loadChanges() {
  storage.get(['user-data'], function (items) {
      const userData = items['user-data'];
      let messages = []; // Array to store the messages

      if (userData && userData['principal-contact-info']) {
          const principalContactInfo = userData['principal-contact-info'];
          if (principalContactInfo.princFirstNameStorage) {
              princFirstNameField.value = principalContactInfo.princFirstNameStorage;
              messages.push('Loaded saved user first name.');
          }
          if (principalContactInfo.princLastNameStorage) {
              princLastNameField.value = principalContactInfo.princLastNameStorage;
              messages.push('Loaded saved user last name.');
          }
          if (principalContactInfo.princEmailStorage) {
              princEmailField.value = principalContactInfo.princEmailStorage;
              messages.push('Loaded saved user email.');
          }
          if (principalContactInfo.princPhoneStorage) {
              princPhoneField.value = principalContactInfo.princPhoneStorage;
              messages.push('Loaded saved user phone number.');
          }
      }

      showMessage(messages.join(' ')); // Concatenate the messages and display
  });
}

async function displayChanges() {
  const items = await storage.get(['user-data']);
  const userData = items['user-data'];
  let messages = []; // Array to store the messages

  if (userData && userData['principal-contact-info']) {
      const principalContactInfo = userData['principal-contact-info'];
      if (principalContactInfo.princFirstNameStorage) {
          princFirstNameDisp.innerText = principalContactInfo.princFirstNameStorage;
          messages.push('Displayed saved user first name.');
      }
      if (principalContactInfo.princLastNameStorage) {
          princLastNameDisp.innerText = principalContactInfo.princLastNameStorage;
          messages.push('Displayed saved user last name.');
      }
      if (principalContactInfo.princEmailStorage) {
          princEmailDisp.innerText = principalContactInfo.princEmailStorage;
          messages.push('Displayed saved user email.');
      }
      if (principalContactInfo.princPhoneStorage) {
          princPhoneDisp.innerText = principalContactInfo.princPhoneStorage;
          messages.push('Displayed saved user phone number.');
      }
  }

  showMessage(messages.join(' ')); // Concatenate the messages and display
}